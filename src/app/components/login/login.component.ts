import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { take, tap } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  loginForm: FormGroup = new FormGroup(
    {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    }
    );

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    try {
      const userCredential = await this.authService.login(email, password);
      this.userService.getUser(userCredential.user.uid).pipe(take(1)).subscribe(appUser => {
        localStorage.setItem('username', JSON.stringify(appUser.username));
      });      
      this.snackBar.open('Logged in successfully', 'Dismiss', {
        panelClass: 'success',
        duration: 3000,
      })
      this.router.navigate(['/books']);
    } catch (error) {
      this.snackBar.open('Incorrect username or password', 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
      throw error;
    }
  }
}
