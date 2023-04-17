import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRequestsComponent } from './book-requests.component';
import { AppUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookRequestsComponent', () => {
  let component: BookRequestsComponent;
  let fixture: ComponentFixture<BookRequestsComponent>;
  let appAdmin = new AppUser('email1', 'admin', true, '1');
  let appUser = new AppUser('email2', 'user', false, '2');
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['']);
    Object.defineProperty(userServiceSpy, 'appUser$', {
      value: of(appUser),
      writable: true,
    });

    await TestBed.configureTestingModule({
      declarations: [ BookRequestsComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render admin-book-requests component if user is an admin', () => {
    component.appUser = appAdmin;
    fixture.detectChanges();

    const adminBookRequestsComponent = fixture.nativeElement.querySelector('admin-book-requests');
    expect(adminBookRequestsComponent).toBeTruthy();
  })

  it('should render user-book-requests component if user is not an admin', () => {
    component.appUser = appUser;
    fixture.detectChanges();

    const userBookRequestsComponent = fixture.nativeElement.querySelector('user-book-requests');
    expect(userBookRequestsComponent).toBeTruthy();
  })
});
