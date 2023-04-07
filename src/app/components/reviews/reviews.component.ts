import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { increment } from '@angular/fire/firestore';
import { PostComponent } from '../post/post.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId;
  reviews: Review[];
  ratingStats: number[];
  subscription: Subscription;

  constructor(
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.reviewService.getReviews(this.bookId)
                        .subscribe(reviews => {
                          this.ratingStats = Array.from({ length: 5 }, () => 0);
                          this.reviews = reviews;
                          reviews.forEach((review) => {
                            this.ratingStats[review.rating - 1]++;
                          });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent, {
      height: '300px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.reviewService.addReview(this.bookId, data.review);
      }
    });
  }

  convertToPercent(number) {
    return ((number / this.reviews.length) * 100).toFixed(0).toString();
  }

  calculateAverageRating() {
    const sum = this.ratingStats.reduce((accumulator, value, index) => accumulator + (value*(index+1)), 0);
    const len = this.reviews.length;
    const avg = sum/len;
    return avg.toFixed(1).toString();
  }

  likeInteraction(event, review: Review) {
    if(event.selected) {
      const data = {
        likes: increment(1)
      }
      this.reviewService.updateReview(this.bookId, review.id, data);
    }
    else {
      const data = {
        likes: increment(-1)
      }
      this.reviewService.updateReview(this.bookId, review.id, data);
    }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
