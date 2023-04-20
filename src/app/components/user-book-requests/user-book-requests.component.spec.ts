import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookRequestsComponent } from './user-book-requests.component';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('MyRequestsComponent', () => {
  let component: UserBookRequestsComponent;
  let fixture: ComponentFixture<UserBookRequestsComponent>;
  const books: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'username1', '1'),
    new Book('book12', 'author2', 'description2', 'image2', [], 'pending', 'username1', '2'),
  ];
  const appUser = new AppUser('email1', 'username1', false, '1');

  let bookSericeSpy: jasmine.SpyObj<BookService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    bookSericeSpy = jasmine.createSpyObj('BookService', ['getBooks']);
    bookSericeSpy.getBooks.and.returnValue(of(books));

    userServiceSpy = jasmine.createSpyObj('UserService', ['']);
    Object.defineProperty(userServiceSpy, 'appUser$', {
      value: of(appUser),
      writable: false
    });

    await TestBed.configureTestingModule({
      declarations: [ UserBookRequestsComponent ],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
      ],
      providers: [
        { provide: BookService, useValue: bookSericeSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of rows', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('table tr'));
    expect(tableRows.length).toEqual(3); // add one for the header row
  });
});
