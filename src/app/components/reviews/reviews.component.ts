import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { NewReviewComponent } from '../new-review/new-review.component';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUser } from 'src/app/models/user';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @Input('bookId') bookId: string;
  @Input('appUser') appUser: AppUser;

  constructor(
    private reviewService: ReviewService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}
  reviews: Review[];
  ratingStats: number[];
  subscription: Subscription;

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
    dialogRef.afterClosed().subscribe(async data => {
      if(data) {
        try {
          await this.reviewService.addReview(this.bookId, data.review);
          this.snackBar.open('Review added', 'Dismiss', {
            panelClass: 'success',
            duration: 5000,
          })
        }
        catch (error) {
          this.snackBar.open(error, 'Dismiss', {
            panelClass: 'error',
            duration: 5000,
          })
        }
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
