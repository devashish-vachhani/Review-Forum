import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AppUser } from 'src/app/models/user';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appUser = new AppUser('email1', 'username1', false, '1');
  let userServiceStub = {
    appUser: of(),
  }
  let authServiceStub = {
    currentUser$: of(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: UserService, useValue: userServiceStub },
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
