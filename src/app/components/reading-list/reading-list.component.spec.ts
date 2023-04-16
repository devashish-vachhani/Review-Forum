import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReadingListComponent } from './reading-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReadingListService } from 'src/app/services/reading-list.service';
import { ReadingListServiceStub } from 'src/app/tests/stubs/reading-list-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { By } from '@angular/platform-browser';
import { Book } from 'src/app/models/book';
import { AuthServiceStub } from 'src/app/tests/stubs/auth-service';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
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

    const bookToRemove = new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1');
    const deleteLink = fixture.debugElement.query(By.css('[data-testid="delete-btn"]')).nativeElement;

    deleteLink.click();
    fixture.detectChanges();
    tick();

    expect(component.deleteFromReadingList).toHaveBeenCalledWith(bookToRemove.id);
    expect(ReadingListServiceStub.deleteFromReadingList).toHaveBeenCalledWith(component.uid, bookToRemove.id);
  }));
});
