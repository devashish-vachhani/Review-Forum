import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, doc, updateDoc, arrayUnion, docData, FieldValue } from '@angular/fire/firestore';
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
        map(books => books.map(book => new Book(book['title'], book['author'], book['description'], book['image'], book['tags'], book['status'], book['id'])))
      );
  }

  getBook(bookId: string): Observable<Book> {
    const bookDocumentRef = doc(this.firestore, 'books', bookId)
    return docData(bookDocumentRef, { idField: 'id'})
            .pipe(
              map(book => new Book(book['title'], book['author'], book['description'], book['image'], book['tags'], book['status'], book['id']))
            )
  }

  async createBook(book: Book): Promise<void> {
    const booksCollectionRef = collection(this.firestore, 'books');
    await addDoc(booksCollectionRef, book);
  }

  async updateBook(bookId: string, data): Promise<void> {
    const bookDocumentRef = doc(this.firestore, 'books', bookId);
    await updateDoc(bookDocumentRef, data);
  }
  
}
