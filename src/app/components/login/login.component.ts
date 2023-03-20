import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('snackBarAnimation', [
      transition(':leave', [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private toast: HotToastService,
    private toastr: ToastrService
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

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    // this.authService
    //     .login(email, password)
    //     .pipe(
    //       catchError(
    //         (error) => {
    //           let errorMessage = 'Invalid username or password'
    //           this.snackBar.open(errorMessage, 'Ok', {
    //             verticalPosition: 'top',
    //             horizontalPosition: 'center',
    //             panelClass: 'bg-danger',
    //           });
    //           throw error;
    //         }
    //       )
    //     )
    //     .subscribe(() => {
    //       let successMessage = 'Logged in successfully';
    //       this.snackBar.open(successMessage, 'Ok', {
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center',
    //         panelClass: 'bg-success',
    //       });
    //       this.router.navigate(['/dashboard']);
    //     });

    this.authService
      .login(email, password)
      .pipe(
        catchError((error) => {
          this.toastr.error('Invalid username or password');
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.toastr.success('Logged in successfully');
        this.router.navigate(['/dashboard']);
      });
  }
}
