import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId: string;
  @Input('review') review: Review;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
  ) {}
  subscription: Subscription;
  username: string;

  ngOnInit(): void {
    this.username = this.userService.username;
    if(!this.username) this.subscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);
  }

  showComments: boolean = false;

  async onLike() {
    const data = {
      likes: arrayUnion(this.username),
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
      likes: arrayRemove(this.username),
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

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
