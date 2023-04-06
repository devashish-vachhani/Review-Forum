import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
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

  get uid(): string {
    const user = this.getUserFromLocalStorage();
    return user ? user.uid : null;
  }
  
  private getUserFromLocalStorage() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

}