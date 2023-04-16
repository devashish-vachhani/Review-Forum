import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'post',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<NewReviewComponent>,
        private userService: UserService,
    ) {}
    rating: number = 0;
    subscription: Subscription;
    username: string;

    ngOnInit(): void {
        this.username = this.userService.username;
        if(!this.username) this.subscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);
    }

    onClick(rating: number): void {
        this.rating = rating
    }

    save(f): void {
        const data = {
            review: new Review(this.username, f.text, new Date(), this.rating, []),
        }
        this.dialogRef.close(data);
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        if(this.subscription) this.subscription.unsubscribe();
    }
}
