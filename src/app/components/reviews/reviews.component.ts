import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input('bookId') bookId;

  constructor(
    private reviewService: ReviewService,
  ) {}

  reviews$: Observable<Review[]>;

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getReviews(this.bookId);
  }

}
