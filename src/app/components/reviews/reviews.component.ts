import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId;
  reviews: Review[];
  ratingStats: number[] = [0,0,0,0,0];
  subscription: Subscription;

  constructor(
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.reviewService.getReviews(this.bookId)
                        .subscribe(reviews => {
                          this.reviews = reviews;
                          reviews.forEach((review) => {
                            this.ratingStats[review.rating - 1]++;
                          });
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

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
