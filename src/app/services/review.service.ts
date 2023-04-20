import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, orderBy, query } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Review } from '../models/review';
import { deleteDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private firestore: Firestore,
  ) { }

  getReviews(bookId: string): Observable<Review[]> {
    const reviewsCollectionRef = query(collection(this.firestore, `books/${bookId}/reviews`), orderBy('date', 'desc'));
    return collectionData(reviewsCollectionRef, { idField: 'id' })
            .pipe(
              map(reviews => reviews.map(review => new Review(review['reviewer'], review['text'], review['date'].toDate(), review['rating'], review['likes'], review['id'])))
            );
  }

  async addReview(bookId: string, review: Review): Promise<void> {
    const reviewsCollectionRef = collection(this.firestore, `books/${bookId}/reviews`);
    await addDoc(reviewsCollectionRef, review.toJson());
  }

  async deleteReview(bookId: string, reviewId: string): Promise<void> {
    const reviewDocumentRef = doc(this.firestore, `books/${bookId}/reviews`, reviewId);
    await deleteDoc(reviewDocumentRef);
  }

  async updateReview(bookId: string, reviewId: string, data): Promise<void> {
    const reviewDocumentRef = doc(this.firestore, `books/${bookId}/reviews`, reviewId);
    await updateDoc(reviewDocumentRef, data);
  }
}
