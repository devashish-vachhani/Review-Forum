import { Injectable } from '@angular/core';
import { deleteDoc, doc, docData, DocumentData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  getUser(uid: string): Observable<DocumentData> {
    const userDocumentRef = doc(this.firestore, 'users', uid);
    return docData(userDocumentRef, { idField: 'id'});
  }

  addUser(user: AppUser) {
    const userDocumentRef = doc(this.firestore, 'users', user.uid);
    return setDoc(userDocumentRef, user);
  }

  updateUser(user: AppUser) {
    const userDocumentRef = doc(this.firestore, 'users', user.uid);
    return updateDoc(userDocumentRef, { ...user });
  }

  deleteUser(user: AppUser): Promise<void> {
    const userDocumentRef = doc(this.firestore, 'users', user.uid);
    return deleteDoc(userDocumentRef);
  }
}
