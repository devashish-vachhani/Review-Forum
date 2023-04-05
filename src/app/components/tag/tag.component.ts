import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatDialogRef} from "@angular/material/dialog";
import { UniversityService } from 'src/app/services/university.service';
import { CourseService } from '../../services/course.service';
import { University, findCodeById } from 'src/app/models/university';
import { Course } from 'src/app/models/course';
@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {
    
    subscription: Subscription;
    universities: University[];
    courses$: Observable<Course[]>;

    constructor(
        private universityService: UniversityService,
        private dialogRef: MatDialogRef<TagComponent>,
        private courseService: CourseService,
        ) {}

    ngOnInit(): void {
        this.subscription = this.universityService.getUniversities().subscribe(universities => {
            this.universities = universities;
        })
    }

    updateCourses(universityId: string): void {
        this.courses$ = this.courseService.getCourses(universityId);
      }

    save(f): void {
        const tag = `${findCodeById(f.university, this.universities)}/${f.course}`;
        this.dialogRef.close(tag);
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
