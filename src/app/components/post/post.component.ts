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
export class PostComponent {
    rating: number = 0;

    constructor(
        private dialogRef: MatDialogRef<PostComponent>,
        private userService: UserService,
        ) {}

    onClick(rating: number): void {
        this.rating = rating
    }

    save(f): void {
        const username = this.userService.username;
        const data = {
            review: new Review(username, f.text, new Date(), this.rating, []),
        }
        this.dialogRef.close(data);
    }

    close(): void {
        this.dialogRef.close();
    }
}
