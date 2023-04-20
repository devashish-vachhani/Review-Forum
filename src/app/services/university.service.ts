import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { University } from '../models/university';
import { map, Observable } from 'rxjs';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(private firestore: Firestore) { }

  getUniversities(): Observable<University[]> {
    const universityCollectionRef = query(collection(this.firestore, "universities"), orderBy('name'));
    return collectionData(universityCollectionRef, { idField: 'id' })
            .pipe(
              map(universities => {
                return universities as University[];
              })
            )
  }
}
