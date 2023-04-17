import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavbarComponent } from './bs-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { AppUser } from 'src/app/models/user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;
  let appUser = new AppUser('email', 'user', false, '2');
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['']);
    Object.defineProperty(userServiceSpy, 'appUser$', {
        value: of(appUser),
        writable: true,
      });

    TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        MatMenuModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});