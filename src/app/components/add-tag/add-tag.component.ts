import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { MatDialogRef} from "@angular/material/dialog";
import { DocumentData } from '@angular/fire/firestore';
import { UniversityService } from 'src/app/services/university.service';
@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent{
    
    universities: DocumentData[];
    
    form: FormGroup;
    description:string;
    subscription: Subscription;
    courses$: Observable<DocumentData[]>;

    constructor(
        private fb: FormBuilder,
        private universityService: UniversityService,
        private dialogRef: MatDialogRef<AddTagComponent>,
        ) {}

    updateCourses(universityId: string) {
        this.courses$ = this.universityService.getCoursesByUniversity(universityId);
      }
    
    findUniversityCodeById(id: string): string {
    const university = this.universities.find(university => university['id'] === id);
    return university['code'];
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []],
        });
        this.subscription = this.universityService.getUniversities().subscribe(universities => {
            this.universities = universities;
        })
    }

    save(f) {
        const tag = this.findUniversityCodeById(f.university) + '/' + f.course
        this.dialogRef.close(tag);
    }

    close() {
        this.dialogRef.close();
    }
}
