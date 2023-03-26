import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, addDoc } from '@angular/fire/firestore';
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

  createBook(book: Book) {
    const booksCollectionRef = collection(this.firestore, 'books');
    return addDoc(booksCollectionRef, book);
  }
}
