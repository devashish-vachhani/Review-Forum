import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Book } from 'src/app/models/book';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { of } from 'rxjs';
import { ReadingList } from 'src/app/models/reading-list';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { AppUser } from 'src/app/models/user';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewsComponent } from '../reviews/reviews.component';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let activatedRoute: ActivatedRoute;
  let booksWithBook: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1'),
    new Book('book2', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
  ]
  let booksWithoutBook: Book[] = [
    new Book('book2', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
  ]
  let book: Book = new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1')
  let appUser = new AppUser('email1', 'username1', false, '1')
  let reviews: Review[] = [
    new Review('reviewer1', 'text1', new Date(), 1, [], '1'),
    new Review('reviewer2', 'text2', new Date(), 2, [], '2'),
    new Review('reviewer3', 'text3', new Date(), 3, [], '3'),
  ];
  
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let readingListServiceSpy: jasmine.SpyObj<ReadingListService>;
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['']);
    Object.defineProperty(userServiceSpy, 'appUser$', {
      value: of(appUser),
      writable: false
    });

    bookServiceSpy = jasmine.createSpyObj('BookService', ['getBook']);
    bookServiceSpy.getBook.and.returnValue(of(book));

    readingListServiceSpy = jasmine.createSpyObj('ReadingListService', ['getReadingList', 'addToReadingList', 'deleteFromReadingList']);
    readingListServiceSpy.getReadingList.and.returnValue(of(new ReadingList(booksWithoutBook)));

    reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviews']);
    reviewServiceSpy.getReviews.and.returnValue(of(reviews));

    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ 
        BookComponent,
        ReviewsComponent 
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: BookService, useValue: bookServiceSpy },
        { provide: ReadingListService, useValue: readingListServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ActivatedRoute, useValue:  {
                                                paramMap: of(convertToParamMap({ id: '1' })),
                                              },
        },
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service with book when "Add to reading list" is clicked', fakeAsync(() => {
    readingListServiceSpy.addToReadingList.and.returnValue(Promise.resolve());
    spyOn(component, 'addToReadingList').and.callThrough();

    component.readingList = new ReadingList(booksWithoutBook);

    const success = 'Added to reading list';

    const addBtn = fixture.debugElement.query(By.css("[data-testid='add-btn']")).nativeElement;
    addBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.addToReadingList).toHaveBeenCalled();
    expect(readingListServiceSpy.addToReadingList).toHaveBeenCalledWith('1', book);
    expect(snackBarSpy.open).toHaveBeenCalledWith(success, 'Dismiss', Object({ panelClass: 'success', duration: 5000 }));
  }))

  it('should call service with bookId when "Remove from reading list" is clicked', fakeAsync(() => {
    readingListServiceSpy.deleteFromReadingList.and.returnValue(Promise.resolve());
    spyOn(component, 'deleteFromReadingList').and.callThrough();

    component.readingList = new ReadingList(booksWithBook);
    fixture.detectChanges();

    const success = 'Removed from reading list';

    const deleteBtn = fixture.debugElement.query(By.css("[data-testid='delete-btn']")).nativeElement;
    deleteBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.deleteFromReadingList).toHaveBeenCalled();
    expect(readingListServiceSpy.deleteFromReadingList).toHaveBeenCalledWith('1', book.id);
    expect(snackBarSpy.open).toHaveBeenCalledWith(success, 'Dismiss', Object({ panelClass: 'success', duration: 5000 }));
  }))

  it('should handle error when add to reading list fails', fakeAsync(() => {
    const error = 'error';
    readingListServiceSpy.addToReadingList.and.returnValue(Promise.reject(error));
    spyOn(component, 'addToReadingList').and.callThrough();

    component.readingList = new ReadingList(booksWithoutBook);

    const addBtn = fixture.debugElement.query(By.css("[data-testid='add-btn']")).nativeElement;
    addBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.addToReadingList).toHaveBeenCalled();
    expect(readingListServiceSpy.addToReadingList).toHaveBeenCalledWith('1', book);
    expect(snackBarSpy.open).toHaveBeenCalledWith(error, 'Dismiss', Object({ panelClass: 'error', duration: 5000 }));
  }))

  it('should open a dialog when "Recommend a tag" is clicked', () => {
    spyOn(component, 'openDialog');
    const recommendTagBtn = fixture.debugElement.query(By.css("[data-testid='recommend-tag-btn']")).nativeElement;
    recommendTagBtn.click()
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalled()
  });

  it('should display reviews component', () => {
    const reviewsComponent = fixture.nativeElement.querySelector('reviews');
    expect(reviewsComponent).toBeTruthy();
  })

  it('should pass book id to reviews component', () => {
    const reviewsComponent = fixture.debugElement.query(By.css('reviews')).componentInstance;
    expect(reviewsComponent.bookId).toBe('1');
  })
});
