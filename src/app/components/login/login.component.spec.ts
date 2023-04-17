import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const AuthServiceStub = jasmine.createSpyObj<AuthService>(
    'AuthService', {
      uid: '1',
    }
  );
  const UserServiceStub = jasmine.createSpyObj<UserService>(
    'UserService', {
      username: 'test',
    }
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub },
        { provide: UserService, useValue: UserServiceStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
