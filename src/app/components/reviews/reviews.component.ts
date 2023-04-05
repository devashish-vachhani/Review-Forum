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
  fiveCount: number
  fourCount: number
  threeCount: number
  twoCount: number
  oneCount: number
  total: number
  average: string


  constructor(
    private reviewService: ReviewService,
  ) {}

  reviews$: Observable<Review[]>;

  ngOnInit(): void {
    let five: number, four: number, three: number, two: number, one: number
    this.reviews$ = this.reviewService.getReviews(this.bookId);
    this.reviews$.subscribe(data => {
      five = 0
      four = 0
      three = 0
      two = 0
      one = 0
      data.forEach(function(review) {
        if (review['rating'] == 5) {
          five++
        }
        if (review['rating'] == 4) {
          four++
        }
        if (review['rating'] == 3) {
          three++
        }
        if (review['rating'] == 2) {
          two++
        }
        if (review['rating'] == 1) {
          one++
        }
      })
      this.fiveCount = five
      this.fourCount = four
      this.threeCount = three
      this.twoCount = two
      this.oneCount = one
      this.total = five + four + three + two + one
      this.average = ((five*5 + four*4 + three*3 + two*2 + one) / this.total).toFixed(1)
    })
  }

  getPercent(number, total){
    console.log(((number/total) * 100).toFixed(0).toString())
    return ((number/total) * 100).toFixed(0).toString()
  }

}
