import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { UniversityService } from 'src/app/services/university.service';
import { University } from 'src/app/models/university';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    universities: University[];
    courses: string[];

    constructor(
        private universityService: UniversityService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<TagComponent>,
    ) {}

    ngOnInit(): void {
        this.subscription = this.universityService.getUniversities().subscribe(universities => {
            this.universities = universities;
        })
    }

    updateCourses(universityCode: string): void {
        const selectedUniversity = this.universities.find(university => university.code === universityCode);
        this.courses = selectedUniversity ? selectedUniversity.courses : [];
    }

    save(f): void {
        if(f.university === "" || f.course === "") {
            this.snackBar.open('University or course is missing', 'Dismiss', {
                panelClass: 'error',
                duration: 5000,
            });
        } else {
            const tag = `${f.university}/${f.course}`;
            this.dialogRef.close(tag);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
