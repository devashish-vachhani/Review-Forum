import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { from, map, Observable, of, switchMap } from 'rxjs';
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

  currentUser$ = authState(this.auth);

  signup(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  get appUser$(): Observable<AppUser> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}