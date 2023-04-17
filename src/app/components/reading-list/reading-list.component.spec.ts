import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReadingListComponent } from './reading-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { By } from '@angular/platform-browser';
import { Book } from 'src/app/models/book';
import { ReadingList } from 'src/app/models/reading-list';
import { of } from 'rxjs';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  const AuthServiceStub = {
    uid: '1',
  }
  const books: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1'),
    new Book('book2', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
  ]

  const ReadingListServiceStub = jasmine.createSpyObj<ReadingListService>(
    'ReadingListService',
    {
        getReadingList: of(new ReadingList(books)),
        addToReadingList: Promise.resolve(),
        deleteFromReadingList: Promise.resolve(),
    }
  );
  let snackBarStub = jasmine.createSpyObj(['open']);

  beforeEach(async () => {
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
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: ReadingListService, useValue: ReadingListServiceStub },
        { provide: MatSnackBar, useValue: snackBarStub },
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
    const deleteLink = fixture.debugElement.query(By.css('[data-testid="delete-btn"]')).nativeElement;

    deleteLink.click();
    fixture.detectChanges();
    tick();

    expect(component.deleteFromReadingList).toHaveBeenCalledWith(bookToRemove.id);
    expect(ReadingListServiceStub.deleteFromReadingList).toHaveBeenCalledWith('1', bookToRemove.id);
  }));
});