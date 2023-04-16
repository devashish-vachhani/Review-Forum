import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UniversityService } from 'src/app/services/university.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { University } from 'src/app/models/university';
import { of } from 'rxjs';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;
  const universities: University[] = [
    { id: '1', name: 'uni1', code: 'u1', courses: ['c1', 'c2'] },
    { id: '2', name: 'uni2', code: 'u2', courses: ['c3','c4'] }
]
  const UniversityServiceStub = jasmine.createSpyObj<UniversityService>(
    'UniversityService',
    {
        getUniversities: of(universities),
    }
  );
  const dialogRefStub = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagComponent ],
      imports: [ 
        MatDialogModule,
        FormsModule,
      ],
      providers: [
        { provide: UniversityService, useValue: UniversityServiceStub },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update courses when university is changed', () => {
    const universitySelect = fixture.debugElement.query(By.css('#university')).nativeElement;
    const coursesSelect = fixture.debugElement.query(By.css('#course')).nativeElement;

    // select University
    universitySelect.value = 'u2';
    universitySelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(coursesSelect.options.length).toEqual(3); // 3 because of the blank option
    expect(coursesSelect.options[1].value).toEqual('c3');
    expect(coursesSelect.options[2].value).toEqual('c4');
  });

  it('should select university, and course, and close dialog with tag on submit', () => {
    // Select university
    const universitySelect = fixture.debugElement.query(By.css('#university')).nativeElement;
    universitySelect.value = 'u2';
    universitySelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Select course
    const courseSelect = fixture.debugElement.query(By.css('#course')).nativeElement;
    courseSelect.value = 'c3';
    courseSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Click submit button
    const submitButton = fixture.debugElement.query(By.css("[data-testid=submit-btn]")).nativeElement;
    submitButton.click();
    fixture.detectChanges();

    // Verify that dialog was closed with the correct tag
    expect(dialogRefStub.close).toHaveBeenCalledWith('u2/c3');
  });  

  it('should close dialog with no value when cancel button is clicked', () => {
    // Click cancel button
    const cancelButton = fixture.debugElement.query(By.css("[data-testid=cancel-btn]")).nativeElement;
    cancelButton.click();
    fixture.detectChanges();
  
    // Verify that dialog was closed with a no tag
    expect(dialogRefStub.close).toHaveBeenCalledWith();
  });
});