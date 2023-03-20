import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  getUser(uid: string): Observable<AppUser> {
    const userDocumentRef = doc(this.firestore, 'users', uid);
    return from(  getDoc(userDocumentRef)).pipe(
                  map(userData => userData.data() as AppUser)
              );
  }

  addUser(user: AppUser): Observable<void> {
    const userDocumentRef = doc(this.firestore, 'users', user.uid);
    return from(setDoc(userDocumentRef, user));
  }

  updateUser(user: AppUser): Observable<void> {
    const userDocumentRef = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(userDocumentRef, { ...user }));
  }

  deleteUser(user: AppUser): Observable<void> {
    const userDocumentRef = doc(this.firestore, 'users', user.uid);
    return from(deleteDoc(userDocumentRef))
  }
}
