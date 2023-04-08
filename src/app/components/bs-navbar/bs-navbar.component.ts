import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { Subscription, of, switchMap } from 'rxjs';
import { AppUser } from 'src/app/models/user';

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
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.subscription = this.userService.appUser$()
                                        .subscribe(appUser => this.appUser = appUser);
  }

  async logout() {
    try {
      await this.authService.logout();
      this.toastr.success('Logged out successfully');
      this.router.navigate(['']);
    } catch (error) {
      this.toastr.error(error);
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
