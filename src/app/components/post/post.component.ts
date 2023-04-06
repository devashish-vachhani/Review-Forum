import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Review } from 'src/app/models/review';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
    rating: number = 0;

    constructor(
        private dialogRef: MatDialogRef<PostComponent>,
        ) {}

    onClick(rating: number): void {
        this.rating = rating
    }

    save(f): void {
        const data = {
        }
        this.dialogRef.close(data);
    }

    close(): void {
        this.dialogRef.close();
    }
}
