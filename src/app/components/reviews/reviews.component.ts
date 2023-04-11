import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { NewReviewComponent } from '../new-review/new-review.component';
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
    private dialog: MatDialog,
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
    const dialogRef = this.dialog.open(NewReviewComponent, {
      height: '300px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.reviewService.addReview(this.bookId, data.review);
      }
    });
  }

  convertToPercent(value: number) {
    if(this.isReviewEmpty()) return "0";
    return ((value / this.reviews.length) * 100).toFixed(0);
  }

  calculateAverageRating() {
    const sum = this.ratingStats.reduce((accumulator, value, index) => accumulator + (value*(index+1)), 0);
    if(this.isReviewEmpty()) return "0";
    const avg = sum/(this.reviews.length);
    return avg.toFixed(1);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  private isReviewEmpty(): boolean {
    return this.reviews.length === 0;
  }
}
