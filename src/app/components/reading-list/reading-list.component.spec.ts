import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReadingListComponent } from './reading-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { Book } from 'src/app/models/book';
import { ReadingList } from 'src/app/models/reading-list';
import { of } from 'rxjs';
import { AppUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let appUser = new AppUser('email1', 'username1', false, '1');
  let books: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1'),
    new Book('book2', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
  ];
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let readingListServiceSpy: jasmine.SpyObj<ReadingListService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['']);
    Object.defineProperty(userServiceSpy, 'appUser$', {
        value: of(appUser),
        writable: true,
      });
    readingListServiceSpy = jasmine.createSpyObj('ReadingListService', ['getReadingList', 'deleteFromReadingList'])
    readingListServiceSpy.getReadingList.and.returnValue(of(new ReadingList(books)));
    snackBarSpy = jasmine.createSpyObj(['open']);

    await TestBed.configureTestingModule({
      declarations: [ ReadingListComponent ],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ReadingListService, useValue: readingListServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of rows in the table', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('table tr'));
    expect(tableRows.length).toEqual(4); // add one for the header row
  });

  it('should delete a book from the reading list', fakeAsync(() => {

    spyOn(component, 'deleteFromReadingList').and.callThrough();

    const bookToRemove = books[0];
    const deleteLink = fixture.debugElement.queryAll(By.css('[data-testid="delete-btn"]'))[0].nativeElement;

    deleteLink.click();
    fixture.detectChanges();
    tick();

    expect(component.deleteFromReadingList).toHaveBeenCalledWith(bookToRemove.id);
    expect(readingListServiceSpy.deleteFromReadingList).toHaveBeenCalledWith('1', bookToRemove.id);
  }));
});