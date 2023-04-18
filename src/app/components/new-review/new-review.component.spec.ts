import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewComponent } from './new-review.component';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Review } from 'src/app/models/review';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppUser } from 'src/app/models/user';
import { of } from 'rxjs';

describe('NewReviewComponent', () => {
  let component: NewReviewComponent;
  let fixture: ComponentFixture<NewReviewComponent>;
  let appUser = new AppUser('email1', 'username1', false, '1');
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let dialogRefStub: jasmine.SpyObj<MatDialogRef<NewReviewComponent>>;
  let snackBarStub: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['']);
    Object.defineProperty(userServiceSpy, 'appUser$', {
        value: of(appUser),
        writable: true,
      });
    dialogRefStub = jasmine.createSpyObj('MatDialogRef', ['close']);
    snackBarStub = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ NewReviewComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MatSnackBar, useValue: snackBarStub },
      ],
      imports: [
        FormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update rating when a star is clicked', () => {
    // Select star rating of 3
    const ratingBtn = fixture.debugElement.queryAll(By.css("[data-testid='rating-btn']"))[2].nativeElement;
    ratingBtn.click()
    fixture.detectChanges();
    expect(component.rating).toEqual(3)
  });

  it('should return a review on submit', () => {
    jasmine.clock().mockDate(new Date('2000-01-01T01:01:01'));

    // Select star rating of 3
    const ratingBtn = fixture.debugElement.queryAll(By.css("[data-testid='rating-btn']"))[2].nativeElement;
    ratingBtn.click()
    fixture.detectChanges();

    // Write description
    const reviewBox = fixture.debugElement.query(By.css('#text')).nativeElement;
    const reviewText = 'This is a test review';
    reviewBox.value = reviewText;
    reviewBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Click post button
    const postButton = fixture.debugElement.query(By.css("[data-testid='post-btn']")).nativeElement;
    postButton.click();
    fixture.detectChanges();

    // Verify that dialog was closed with the correct review
    expect(dialogRefStub.close).toHaveBeenCalledWith({
      review: new Review('username1', reviewText, new Date(), 3, []),
    });
  }); 

  it('should return null on cancel', () => {
    // Click cancel button
    const cancelButton = fixture.debugElement.query(By.css("[data-testid='cancel-btn']")).nativeElement;
    cancelButton.click();
    fixture.detectChanges();
  
    // Verify that dialog was closed with a no review
    expect(dialogRefStub.close).toHaveBeenCalled();
  });

  it('should show an alert if a user attempts to submit without a rating', () => {

    // Write description
    const review = fixture.debugElement.query(By.css("#text")).nativeElement;
    const reviewText = 'This is a test review';
    review.value = reviewText;
    review.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.rating = 0;
    fixture.detectChanges();

    // Click post button
    const postButton = fixture.debugElement.query(By.css("[data-testid='post-btn']")).nativeElement;
    postButton.click();
    fixture.detectChanges();

    // Verify that a snackbar alert was called
    expect(snackBarStub.open).toHaveBeenCalled()

    // Verify that dialog was not closed
    expect(dialogRefStub.close).not.toHaveBeenCalled()
  }); 
});