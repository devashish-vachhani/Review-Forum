import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { of } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookSearchComponent } from '../book-search/book-search.component';
import { University } from 'src/app/models/university';
import { UniversityService } from 'src/app/services/university.service';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  const books: Book[] = [
    new Book('book1', 'author1', 'description1', 'image1', [], 'approved', 'admin', '1'),
    new Book('book12', 'author2', 'description2', 'image2', [], 'approved', 'admin', '2'),
    new Book('book3', 'author3', 'description3', 'image3', [], 'approved', 'admin', '3'),
  ]
  const universities: University[] = [
    { id: '1', name: 'uni1', code: 'u1', courses: ['c1', 'c2'] },
    { id: '2', name: 'uni2', code: 'u2', courses: ['c3','c4'] }
  ]
  let activatedRoute: ActivatedRoute;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let universityServiceSpy: jasmine.SpyObj<UniversityService>;

  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', ['getBooks']);
    bookServiceSpy.getBooks.and.returnValue(of(books));

    universityServiceSpy = jasmine.createSpyObj('UniversityService', ['getUniversities']);
    universityServiceSpy.getUniversities.and.returnValue(of(universities));

    await TestBed.configureTestingModule({
      declarations: [ 
        BooksComponent,
        BookSearchComponent,
       ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: BookService, useValue: bookServiceSpy },
        { provide: UniversityService, useValue: universityServiceSpy },
        { provide: ActivatedRoute, useValue:  {
                                                queryParams: of({ title: 'book1' }),
                                              },
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book search component', () => {
    const bookSearch = fixture.nativeElement.querySelector('book-search');
    expect(bookSearch).toBeTruthy();
  });

  it('should filter books correctly', () => {
    expect(component.filteredBooks.length).toEqual(2);
  });
});
