import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UniversityService } from 'src/app/services/university.service';
import { BookService } from 'src/app/services/book.service';
import { University } from 'src/app/models/university';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let router: Router;
  const UserServiceStub = {
    username: 'test'
  };
  const universities: University[] = [
    { id: '1', name: 'uni1', code: 'u1', courses: ['c1', 'c2'] },
    { id: '2', name: 'uni2', code: 'u2', courses: ['c3', 'c4'] }
]
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let universityServiceSpy: jasmine.SpyObj<UniversityService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', ['createBook']);
    universityServiceSpy = jasmine.createSpyObj('UniversityService', ['getUniversities']);
    universityServiceSpy.getUniversities.and.returnValue(of(universities));
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ BookFormComponent ],
      providers: [
        { provide: UserService, useValue: UserServiceStub },
        { provide: UniversityService, useValue: universityServiceSpy },
        { provide: BookService, useValue: bookServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{path: 'books', redirectTo: ''}]),
        FormsModule,
        MatSnackBarModule,
        RouterModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty fields', () => {

    const title = fixture.debugElement.query(By.css('#title')).nativeElement;
    const author = fixture.debugElement.query(By.css('#author')).nativeElement;
    const description = fixture.debugElement.query(By.css('#description')).nativeElement;
    const image = fixture.debugElement.query(By.css('#image')).nativeElement;
    const universitySelect = fixture.debugElement.query(By.css('#university')).nativeElement;
    const coursesSelect = fixture.debugElement.query(By.css('#course')).nativeElement;

    fixture.detectChanges();

    expect(title.value).toEqual('');
    expect(author.value).toEqual('');
    expect(description.value).toEqual('');
    expect(image.value).toEqual('');
    expect(universitySelect.value).toEqual('');
    expect(coursesSelect.value).toEqual('');
  });

  it('should update courses when university is changed', () => {

    const universitySelect = fixture.debugElement.query(By.css('#university')).nativeElement;
    const coursesSelect = fixture.debugElement.query(By.css('#course')).nativeElement;

    // select University
    universitySelect.value = 'u2';
    universitySelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(coursesSelect.options.length).toEqual(3); // 3 because of the blank option
    expect(coursesSelect.options[1].value).toEqual('c3');
    expect(coursesSelect.options[2].value).toEqual('c4');
  });

  it('should submit a book request on clicking submit', fakeAsync (() => {
    // Watch router navigations
    const routerSpy = spyOn(router, 'navigate');
    spyOn(component, 'onSubmit').and.callThrough();

    const title = fixture.debugElement.query(By.css('#title')).nativeElement;
    const author = fixture.debugElement.query(By.css('#author')).nativeElement;
    const description = fixture.debugElement.query(By.css('#description')).nativeElement;
    const image = fixture.debugElement.query(By.css('#image')).nativeElement;

    //Fill out title
    title.value = 'title'
    title.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //Fill out author
    author.value = 'author'
    author.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    //Fill out description
    description.value = 'description'
    description.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    //Fill out image
    image.value = 'image'
    image.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Select university
    const universitySelect = fixture.debugElement.query(By.css('#university')).nativeElement;
    universitySelect.value = 'u2';
    universitySelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Select course
    const courseSelect = fixture.debugElement.query(By.css('#course')).nativeElement;
    courseSelect.value = 'c3';
    courseSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Click submit button
    const submitButton = fixture.debugElement.query(By.css("[data-testid=submit-request-btn]")).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    tick(200);

    expect(component.onSubmit).toHaveBeenCalled();
    // Verify that the book was made with the correct information
    expect(bookServiceSpy.createBook).toHaveBeenCalledWith(new Book('title', 'author', 'description', 'image', ['u2/c3'], "pending", 'test'));
    expect(snackBarSpy.open).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/books']);
  }));
});
