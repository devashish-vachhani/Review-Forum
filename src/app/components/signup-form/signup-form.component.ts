import { Component } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  signupForm: UntypedFormGroup = new UntypedFormGroup(
    {
      username: new UntypedFormControl('', [Validators.required]),
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
    private snackBar: MatSnackBar,
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

  get username() {
    return this.signupForm.get('username');
  }

  async onSubmit() {
    const { username, email, password } = this.signupForm.value;

    if (!this.signupForm.valid || !username || !password || !email) {
      return;
    }

    try {
      const userCredential = await this.authService.signup(email, password);
      const user = userCredential.user
      const appUser = new AppUser(email, username, false);
      await this.userService.addUser(user.uid, appUser);
      localStorage.setItem('username', JSON.stringify(appUser.username));
      this.snackBar.open('Signed up successfully', 'Dismiss', {
        panelClass: 'success',
        duration: 3000,
      })
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.snackBar.open('Error while creating account', 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
      
    }
}
