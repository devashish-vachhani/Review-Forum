import { Component, Input } from '@angular/core';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { AppUser } from 'src/app/models/user';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input('bookId') bookId: string;
  @Input('review') review: Review;
  @Input('appUser') appUser: AppUser;

  constructor(
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
  ) {}
  subscription: Subscription;
  showComments: boolean = false;

  async onLike() {
    const data = {
      likes: arrayUnion(this.appUser.username),
    }
    try {
      await this.reviewService.updateReview(this.bookId, this.review.id, data);
    }
    catch (error) {
      this.snackBar.open(error, 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  async onDislike() {
    const data = {
      likes: arrayRemove(this.appUser.username),
    }
    try {
      await this.reviewService.updateReview(this.bookId, this.review.id, data);
    }
    catch (error) {
      this.snackBar.open(error, 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
