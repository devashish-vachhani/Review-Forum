import { Component } from '@angular/core';
import { AppUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.scss']
})
export class BookRequestsComponent {
  constructor(
    private userService: UserService,
  ) {}
  subscription: Subscription;
  appUser: AppUser;

  ngOnInit(): void {
    this.subscription = this.userService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }
}
