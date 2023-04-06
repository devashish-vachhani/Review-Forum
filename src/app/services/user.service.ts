import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid: string;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    ) {
      this.uid = this.authService.uid;
    }

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
}
