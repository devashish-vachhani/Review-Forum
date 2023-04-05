import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AppUser } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
    private userService: UserService
    ) {}

  currentUser$ = authState(this.auth).pipe(
    tap(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    })
  );

  signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid).pipe(
            map(docData => docData as AppUser)
          );
        } else {
          return of(null);
        }
      })
    );
  }

  get uid(): string {
    const user = this.getUserFromLocalStorage();
    return user ? user.uid : null;
  }
  
  private getUserFromLocalStorage() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

}