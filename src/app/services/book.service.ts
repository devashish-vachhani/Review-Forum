import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, doc, updateDoc, arrayUnion, docData } from '@angular/fire/firestore';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(
    private firestore: Firestore,
    ) {}

  getBooks() {
    const booksCollectionRef = collection(this.firestore, 'books');
    return collectionData(booksCollectionRef, { idField: 'id' })
  }

  getBook(bookId: string) {
    const bookDocumentRef = doc(this.firestore, 'books', bookId)
    return docData(bookDocumentRef, { idField: 'id'})
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
