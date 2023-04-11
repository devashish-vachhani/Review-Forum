import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  appUser: AppUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.subscription = this.userService.appUser$
                                        .subscribe(appUser => this.appUser = appUser);
  }

  async logout() {
    try {
      await this.authService.logout();
      localStorage.removeItem('username');
      this.snackBar.open('Logged out successfully', 'Dismiss', {
        panelClass: 'success',
        duration: 3000,
      })
      this.router.navigate(['']);
    } catch (error) {
      
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
