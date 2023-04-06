import { Component, Inject, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UniversityService } from 'src/app/services/university.service';
import { CourseService } from '../../services/course.service';
import { University, findCodeById } from 'src/app/models/university';
import { Course } from 'src/app/models/course';
import { arrayUnion } from '@angular/fire/firestore';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
    
    subscription: Subscription;
    universities: University[];
    courses$: Observable<Course[]>;
    rating: number = 0;
    ratingArr = [1, 2, 3, 4, 5];

    constructor(
        private universityService: UniversityService,
        private dialogRef: MatDialogRef<PostComponent>,
        private courseService: CourseService,
        private bookService: BookService,
        @Inject(MAT_DIALOG_DATA) private data: {bookId: string},
        ) {}

    ngOnInit(): void {
        this.subscription = this.universityService.getUniversities().subscribe(universities => {
            this.universities = universities;
        })
    }

    updateCourses(universityId: string): void {
        this.courses$ = this.courseService.getCourses(universityId);
    }

    onClick(rating:number) {
        console.log(rating)
        this.rating = rating
        return false;
    }

    showIcon(index:number) {
        if (this.rating >= index + 1) {
          return 'star';
        } else {
          return 'star_border';
        }
    }

    save(f): void {
        if(this.rating > 0){
            const data = {
                rating: this.rating,
                review: f.review,
            }
            this.dialogRef.close(data);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
