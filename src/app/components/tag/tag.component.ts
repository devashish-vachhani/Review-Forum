import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from "@angular/material/dialog";
import { UniversityService } from 'src/app/services/university.service';
import { University } from 'src/app/models/university';

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
        const tag = `${f.university}/${f.course}`;
        this.dialogRef.close(tag);
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
