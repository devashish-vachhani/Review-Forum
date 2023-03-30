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
  
            
  //   return this.currentUser$
  //           .pipe(
  //             switchMap(user => {
  //               if (user) {
  //                 return this.userService.getUser(user.uid).pipe(
  //                   switchMap(data => data as AppUser);
  //                 );
  //               } else {
  //                 return of(null);
  //               }
  //             })
  //           );
  // }
}