import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AdminBookRequestsComponent } from './admin-book-requests.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AdminBookRequestsComponent', () => {
  let component: AdminBookRequestsComponent;
  let fixture: ComponentFixture<AdminBookRequestsComponent>;
  let books: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'pending', 'test', '1'),
    new Book('book2', 'author2', 'description2', 'image2', [], 'pending', 'test', '2'),
  ]
  let bookSericeSpy: jasmine.SpyObj<BookService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    bookSericeSpy = jasmine.createSpyObj('BookService', ['getBooks', 'updateBook']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    bookSericeSpy.getBooks.and.returnValue(of(books));

    await TestBed.configureTestingModule({
      declarations: [ AdminBookRequestsComponent ],
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
      ],
      providers: [
        { provide: BookService, useValue: bookSericeSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookRequestsComponent);
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

  it('should call the service with approved status on clicking accept', fakeAsync(() => {
    bookSericeSpy.updateBook.and.returnValue(Promise.resolve());
    spyOn(component, 'approve').and.callThrough();
    const success = 'Book request was accepted';

    const data = {
      status: 'approved',
    };

    const bookToApprove = books[0];
    const approveBtn = fixture.debugElement.queryAll(By.css('[data-testid="approve-btn"]'))[0].nativeElement;
    approveBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.approve).toHaveBeenCalledWith(bookToApprove.id);
    expect(bookSericeSpy.updateBook).toHaveBeenCalledWith(bookToApprove.id, data);
    expect(snackBarSpy.open).toHaveBeenCalledWith(success, 'Dismiss', Object({ panelClass: 'success', duration: 5000 }));
  }));

  it('should call the service with declined status on clicking decline', fakeAsync(() => {
    bookSericeSpy.updateBook.and.returnValue(Promise.resolve());
    spyOn(component, 'decline').and.callThrough();
    const success = 'Book request was declined';

    const data = {
      status: 'declined',
    };

    const bookToDecline = books[0];
    const declineBtn = fixture.debugElement.queryAll(By.css('[data-testid="decline-btn"]'))[0].nativeElement;
    declineBtn.click();
    fixture.detectChanges();
    tick(200);

    expect(component.decline).toHaveBeenCalledWith(bookToDecline.id);
    expect(bookSericeSpy.updateBook).toHaveBeenCalledWith(bookToDecline.id, data);
    expect(snackBarSpy.open).toHaveBeenCalledWith(success, 'Dismiss', Object({ panelClass: 'success', duration: 5000 }));
  }));

  it('should handle error when updateBook fails', fakeAsync(() => {
    const error = 'error';
    bookSericeSpy.updateBook.and.returnValue(Promise.reject(error));
    spyOn(component, 'approve').and.callThrough();
  
    const bookToApprove = books[0];
    const approveBtn = fixture.debugElement.queryAll(By.css('[data-testid="approve-btn"]'))[0].nativeElement;
    approveBtn.click();
    fixture.detectChanges();
    tick(200);
  
    expect(component.approve).toHaveBeenCalledWith(bookToApprove.id);
    expect(bookSericeSpy.updateBook).toHaveBeenCalledWith(bookToApprove.id, {status: 'approved'});
    expect(snackBarSpy.open).toHaveBeenCalledWith(error, 'Dismiss', Object({ panelClass: 'error', duration: 5000 }));
  }));
});