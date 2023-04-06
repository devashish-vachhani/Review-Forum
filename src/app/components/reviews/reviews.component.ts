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
  ratingStats: number[] = [0,0,0,0,0];
  subscription: Subscription;

  constructor(
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.reviewService.getReviews(this.bookId)
                        .pipe(
                          distinctUntilChanged( (prev, curr) => prev.length === curr.length )
                        )
                        .subscribe(reviews => {
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.rating);
      console.log(result.review);
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
    console.log()
    if(event.selected) {
      review.likes += 1
      const data = {
        likes: increment(1)
      }
      this.reviewService.updateReview(this.bookId, review.id, data);
    }
    else {
      review.likes -= 1
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
