import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    ) {}

  getUser(uid: string): Observable<AppUser> {
    const userDocumentRef = doc(this.firestore, 'users', uid);
    return docData(userDocumentRef, { idField: 'id'})
            .pipe(
              map(user => {
                if(user) {
                  return new AppUser(user['email'], user['username'], user['isAdmin'], user['id'])
                } else {
                  return null;
                }
              })
            )
  }

  async addUser(uid: string, user: AppUser) {
    const userDocumentRef = doc(this.firestore, 'users', uid);
    await setDoc(userDocumentRef, user.toJson());
  }

  get appUser$(): Observable<AppUser> {
    return this.authService.currentUser$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.getUser(user.uid)
          } else {
            return of(null);
          }
        })
      );
  }
}
