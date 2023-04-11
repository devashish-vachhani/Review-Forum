import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, doc, updateDoc, docData, query, where, deleteDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private firestore: Firestore,
    ) {}

  getBooks(status?: string, requester?: string): Observable<Book[]> {
    let q;
    if (status !== undefined) {
      q = query(collection(this.firestore, "books"), where("status", "==", status));
    } else if (requester !== undefined) {
      q = query(collection(this.firestore, "books"), where("requester", "==", requester));
    } else {
      q = collection(this.firestore, "books");
    }
    return collectionData(q, { idField: 'id' })
      .pipe(
        map(books => books.map(book => new Book(book['title'], book['author'], book['description'], book['image'], book['tags'], book['status'], book['requester'], book['id'])))
      );
  }

  getBook(bookId: string): Observable<Book> {
    const bookDocumentRef = doc(this.firestore, 'books', bookId)
    return docData(bookDocumentRef, { idField: 'id'})
            .pipe(
              map(book => new Book(book['title'], book['author'], book['description'], book['image'], book['tags'], book['status'], book['requester'], book['id']))
            )
  }

  async createBook(book: Book): Promise<void> {
    const booksCollectionRef = collection(this.firestore, 'books');
    await addDoc(booksCollectionRef, book.toJSON());
  }

  async updateBook(bookId: string, data): Promise<void> {
    const bookDocumentRef = doc(this.firestore, 'books', bookId);
    await updateDoc(bookDocumentRef, data);
  }

  async deleteBook(bookId: string): Promise<void> {
    const bookDocumentRef = doc(this.firestore, 'books', bookId);
    await deleteDoc(bookDocumentRef);
  }
  
}
