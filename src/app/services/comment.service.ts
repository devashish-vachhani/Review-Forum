import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Comment } from '../models/comment';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private firestore: Firestore,
  ) { }

  getComments(bookId: string, reviewId: string): Observable<Comment[]> {
    const commentsCollectionRef = query(collection(this.firestore, `books/${bookId}/reviews/${reviewId}/comments`), orderBy('date', 'desc'));
    return collectionData(commentsCollectionRef, { idField: 'id' })
            .pipe(
              map(comments => comments.map(comment => new Comment(comment['commenter'], comment['text'], comment['date'].toDate(), comment['id'])))
            );
  }

  async addComment(bookId: string, reviewId: string, comment: Comment): Promise<void> {
    const commentsCollectionRef = collection(this.firestore, `books/${bookId}/reviews/${reviewId}/comments`);
    await addDoc(commentsCollectionRef, comment.toJson());
  }

  async deleteComment(bookId: string, reviewId: string, commentId: string): Promise<void> {
    const commentDocumentRef = doc(this.firestore, `books/${bookId}/reviews/${reviewId}/comments`, commentId);
    await deleteDoc(commentDocumentRef);
  }
}
