import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Review } from '../models/review';
import { deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private firestore: Firestore,
  ) { }

  getReviews(bookId: string): Observable<Review[]> {
    const reviewsCollectionRef = collection(this.firestore, `books/${bookId}/reviews`);
    return collectionData(reviewsCollectionRef, { idField: 'id' })
            .pipe(
              map(reviews => {
                return reviews as Review[];
              })
            )
  }

  async addReview(bookId: string, review: Review): Promise<void> {
    const reviewsCollectionRef = collection(this.firestore, `books/${bookId}/reviews`);
    await addDoc(reviewsCollectionRef, review);
  }

  async deleteReview(bookId: string, reviewId: string): Promise<void> {
    const reviewDocumentRef = doc(this.firestore, `books/${bookId}/reviews`, reviewId);
    await deleteDoc(reviewDocumentRef);
  }
}
