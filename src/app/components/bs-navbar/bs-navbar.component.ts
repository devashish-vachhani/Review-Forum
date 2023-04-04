import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from '../../models/user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    ) {}

  appUser: AppUser

  ngOnInit(): void {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser)
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
}
