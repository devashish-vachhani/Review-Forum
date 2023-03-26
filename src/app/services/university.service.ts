import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(private firestore: Firestore) { }

  getUniversities() {
    return collectionData(collection(this.firestore, "universities"), { idField: 'id' })
  }

  getCoursesByUniversity(id: string) {
    return collectionData(collection(this.firestore, "universities/"+id+"/courses"), { idField: 'id' })
  }
}
