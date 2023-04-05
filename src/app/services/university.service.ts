import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore } from '@angular/fire/firestore';
import { University } from '../models/university';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(private firestore: Firestore) { }

  getUniversities(): Observable<University[]> {
    return collectionData(collection(this.firestore, "universities"), { idField: 'id' })
            .pipe(
              map(universities => {
                return universities as University[];
              })
            )
  }
}
