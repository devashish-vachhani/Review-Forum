import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  const AuthServiceStub = jasmine.createSpyObj<AuthService>(
    'AuthService',
    {
        uid: '1',
    }
  );
  const UserServiceStub = jasmine.createSpyObj<UserService>(
    'UserService', 
    {
        username: 'test',
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFormComponent ],
      imports: [
        MatSnackBarModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: UserService, useValue: UserServiceStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
