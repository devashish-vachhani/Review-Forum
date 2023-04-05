import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private firestore: Firestore) { }

  getCourses(universityId: string): Observable<Course[]> {
    return collectionData(collection(this.firestore, `universities/${universityId}/courses`), { idField: 'id' })
            .pipe(
              map(courses => {
                return courses as Course[];
              })
            )
  }
}
