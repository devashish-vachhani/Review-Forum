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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewsComponent } from '../reviews/reviews.component';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let activatedRoute: ActivatedRoute;
  let books: Book[] = [
    new Book('book2', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
    new Book('book4', 'author4', 'description4', 'image4', [], 'approved', 'admin', '4'),
  ]

  let ReadingListServiceStub = jasmine.createSpyObj<ReadingListService>(
    'ReadingListService',
    {
        getReadingList: of(new ReadingList(books)),
        addToReadingList: Promise.resolve(),
        deleteFromReadingList: Promise.resolve(),
    }
  );
  let book: Book = new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1')
  let BookServiceStub = jasmine.createSpyObj<BookService>(
    'BookService',
    {
      getBook: of(book),
    }
  );
  let appUser = new AppUser('email1', 'username1', false, '1')
  const UserServiceStub = jasmine.createSpyObj<UserService>(
    'UserService', 
    {
      getUser: of(appUser),
      addUser: Promise.resolve(),
    }
  );
  Object.defineProperty(UserServiceStub, 'appUser$', {
    value: of(appUser),
    writable: false
  });
  const reviews: Review[] = [
    new Review('reviewer1', 'text1', new Date(), 1, [], '1'),
    new Review('reviewer2', 'text2', new Date(), 2, [], '2'),
    new Review('reviewer3', 'text3', new Date(), 3, [], '3'),
  ];
  const ReviewServiceStub = jasmine.createSpyObj<ReviewService>(
    'ReviewService', 
    {
      getReviews: of(reviews),
    }
  );
  beforeEach(async () => {
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
        { provide: BookService, useValue: BookServiceStub },
        { provide: ReadingListService, useValue: ReadingListServiceStub },
        { provide: UserService, useValue: UserServiceStub },
        { provide: ActivatedRoute, useValue:  {
                                                paramMap: of(convertToParamMap({ id: '1' })),
                                              },
        },
        { provide: ReviewService, useValue: ReviewServiceStub },
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

  it('should add a book to reading list', fakeAsync(() => {
    spyOn(component, 'addToReadingList').and.callThrough();
    const addBtn = fixture.debugElement.query(By.css("[data-testid='add-btn']")).nativeElement;
    addBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.addToReadingList).toHaveBeenCalled();
    expect(ReadingListServiceStub.addToReadingList).toHaveBeenCalledWith('1', book);
  }))

  it('should open a dialog on clicking recommend tag button', () => {
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
