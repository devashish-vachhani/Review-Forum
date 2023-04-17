import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsComponent } from './reviews.component';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ReviewComponent } from '../review/review.component';
import { UserService } from 'src/app/services/user.service';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;
  const reviews: Review[] = [
    new Review('reviewer1', 'text1', new Date(), 1, [], '1'),
    new Review('reviewer2', 'text2', new Date(), 2, [], '2'),
    new Review('reviewer3', 'text3', new Date(), 3, [], '3'),
  ];
  const userServiceStub = {
    username: 'test',
  }
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;

  beforeEach(async () => {
    reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviews']);
    reviewServiceSpy.getReviews.and.returnValue(of(reviews));

    await TestBed.configureTestingModule({
      declarations: [ 
                      ReviewsComponent,
                      ReviewComponent,
                    ],
      providers: [
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: UserService, useValue: userServiceStub }
      ],
      imports: [ 
        MatDialogModule, 
        MatSnackBarModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct average rating', () => {
    const avgRating = fixture.debugElement.query(By.css("[data-testid='avg-rating']")).nativeElement;
    expect(avgRating.innerText.trim()).toContain("2.0")
  });

  it('should open a review dialog when "Write a review" is clicked', () => {
    spyOn(component, 'openDialog');
    const writeReviewBtn = fixture.debugElement.query(By.css("[data-testid='write-review-btn']")).nativeElement;
    writeReviewBtn.click()
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalled()
  })

  it('should render correct number of review components', () => {
    const reviewComponents = fixture.nativeElement.querySelectorAll('review');
    expect(reviewComponents.length).toEqual(3);
  })
});
