import { Component } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  signupForm: UntypedFormGroup = new UntypedFormGroup(
    {
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get name() {
    return this.signupForm.get('name');
  }

  onSubmit() {
    const { name, email, password } = this.signupForm.value;

    if (!this.signupForm.valid || !name || !password || !email) {
      return;
    }

    this.authService
      .signup(email, password)
      .pipe(
        switchMap(({ user: { uid } }) => {
          return this.userService.addUser({ uid, email, name, isAdmin: false });
        }),
        catchError((error) => {
          this.toastr.error('Error while creating account');
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.toastr.success('Account created successfully');
        this.router.navigate(['/login']);
      });
  }
}
