import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, doc, updateDoc, arrayUnion, docData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    private firestore: Firestore,
    ) {}

  getBooks(): Observable<Book[]> {
    const booksCollectionRef = collection(this.firestore, 'books');
    return collectionData(booksCollectionRef, { idField: 'id' })
            .pipe(
              map(books => {
                return books as Book[];
              })
            )
  }

  getBook(bookId: string): Observable<Book> {
    const bookDocumentRef = doc(this.firestore, 'books', bookId)
    return  docData(bookDocumentRef, { idField: 'id'})
            .pipe(
              map(book => {
                return book as Book;
              })
            )
  }

  createBook(book: Book) {
    const booksCollectionRef = collection(this.firestore, 'books');
    return addDoc(booksCollectionRef, book);
  }

  addTag(bookId: string, tag: string) {
    const bookDocumentRef = doc(this.firestore, 'books', bookId);
    updateDoc(bookDocumentRef, {
      tags: arrayUnion(tag)
  });
  }
}
