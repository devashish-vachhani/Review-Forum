import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, DocumentData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';
import { AuthService } from 'src/app/services/auth.service';
import { ReadingList } from '../models/reading-list';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class ReadingListService {
  uid: string = this.authService.uid;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
  ) {}

  getReadingList(): Observable<ReadingList> {
    const readingListCollectionRef = collection(this.firestore, `users/${this.uid}/reading-list`);
    return  collectionData(readingListCollectionRef, { idField: 'id' })
            .pipe(
              map(docsData => {
                const books = docsData as Book[];
                return new ReadingList(books);
              })
            );
  }

  addToReadingList(book: Book): Promise<void> {
    const bookDocumentRef = doc(this.firestore, `users/${this.uid}/reading-list`, book['id']);
    return setDoc(bookDocumentRef, book.toJSON());
  }

  deleteFromReadingList(bookId: string): Promise<void> {
    const bookDocumentRef = doc(this.firestore, `users/${this.uid}/reading-list`, bookId);
    return deleteDoc(bookDocumentRef);
  }
}
