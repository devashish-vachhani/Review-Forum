import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { NewReviewComponent } from '../new-review/new-review.component';
import { MatDialog } from "@angular/material/dialog";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId;
  
  reviews: Review[];
  ratingStats: number[];
  reviewSubscription: Subscription;
  userSubscription: Subscription;
  username: string;


  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);

    this.reviewSubscription = this.reviewService.getReviews(this.bookId)
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
    return ((value / this.reviews.length) * 100).toFixed(0).toString();
  }

  calculateAverageRating() {
    const sum = this.ratingStats.reduce((accumulator, value, index) => accumulator + (value*(index+1)), 0);
    const len = this.reviews.length;
    const avg = sum/len;
    return avg.toFixed(1).toString();
  }

  ngOnDestroy(): void {
      this.reviewSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
  }

}
