import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid: string = this.authService.uid;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    ) {}

  getUser(uid: string): Observable<AppUser> {
    const userDocumentRef = doc(this.firestore, 'users', uid);
    return docData(userDocumentRef)
            .pipe(
              map(user => new AppUser(user['email'], user['username'], user['isAdmin']))
            );
  }

  async addUser(user: AppUser) {
    const userDocumentRef = doc(this.firestore, 'users', this.uid);
    await setDoc(userDocumentRef, user.toJson());
  }

  appUser$(): Observable<AppUser> {
    return this.authService.currentUser$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.getUser(user.uid).pipe(
              tap(appUser => {
                localStorage.setItem('username', JSON.stringify(appUser.username));
              })
            );
          } else {
            localStorage.removeItem('username');
            return of(null);
          }
        })
      );
  }  

  get username(): string {
    const username = this.getUsernameFromLocalStorage();
    return username;
  }
  
  private getUsernameFromLocalStorage() {
    const usernameJson = localStorage.getItem('username');
    return usernameJson ? JSON.parse(usernameJson) : null;
  }
}
