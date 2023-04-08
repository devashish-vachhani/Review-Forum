import { Component, Input } from '@angular/core';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input('bookId') bookId: string;
  @Input('review') review: Review;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
  ) {}

  username: string = this.userService.username;
  showComments: boolean = false;

  onLike(reviewId: string) {
    const data = {
      likes: arrayUnion(this.username),
    }
    this.reviewService.updateReview(this.bookId, reviewId, data);
  }

  onDislike(reviewId: string) {
    const data = {
      likes: arrayRemove(this.username),
    }
    this.reviewService.updateReview(this.bookId, reviewId, data);
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
