import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc, doc, updateDoc, arrayUnion, docData } from '@angular/fire/firestore';
import { from } from 'rxjs';
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

  getBook(id: string) {
    const bookDocRef = doc(this.firestore, 'books', id)
    return docData(bookDocRef, { idField: 'id'})
  }

  createBook(book: Book) {
    const booksCollectionRef = collection(this.firestore, 'books');
    return addDoc(booksCollectionRef, book);
  }

  addTag(book_id: string, tag: string) {
    const bookDocumentRef = doc(this.firestore, 'books', book_id);
    updateDoc(bookDocumentRef, {
      tags: arrayUnion(tag)
  });
  }
}
