import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { AppUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
    appUser: AppUser;
    subscription: Subscription;
    rating: number = 0;

    constructor(
        private dialogRef: MatDialogRef<PostComponent>,
        private userService: UserService,
        ) {}

    ngOnInit(): void {
        this.subscription = this.userService.appUser$()
                                            .subscribe(appUser => this.appUser = appUser);
    }

    onClick(rating: number): void {
        this.rating = rating
    }

    save(f): void {
        const data = {
            review: new Review(this.appUser.username, f.text, new Date(), this.rating, 0),
        }
        this.dialogRef.close(data);
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
