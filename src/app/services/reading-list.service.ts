import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';
import { ReadingList } from '../models/reading-list';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {

  constructor(
    private firestore: Firestore,
  ) {}

  getReadingList(uid: string): Observable<ReadingList> {
    const readingListCollectionRef = collection(this.firestore, `users/${uid}/reading-list`);
    return  collectionData(readingListCollectionRef, { idField: 'id' })
            .pipe(
              map(docsData => {
                const books = docsData as Book[];
                return new ReadingList(books);
              })
            );
  }

  addToReadingList(uid: string, book: Book): Promise<void> {
    const bookDocumentRef = doc(this.firestore, `users/${uid}/reading-list`, book['id']);
    return setDoc(bookDocumentRef, book.toJSON());
  }

  deleteFromReadingList(uid:string, bookId: string): Promise<void> {
    const bookDocumentRef = doc(this.firestore, `users/${uid}/reading-list`, bookId);
    return deleteDoc(bookDocumentRef);
  }
}
