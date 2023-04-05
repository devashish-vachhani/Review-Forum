import { Component, OnDestroy, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { Observable, Subscription } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { University, findCodeById } from 'src/app/models/university';
import { CourseService } from '../../services/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  universities: University[];
  courses$: Observable<Course[]>;
  subscription: Subscription;

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private bookService: BookService,
    private toastr: ToastrService,
    private courseService: CourseService,
    ) {}

  ngOnInit(): void {
    this.subscription = this.universityService.getUniversities().subscribe(universities => {
      this.universities = universities;
    })
  }

  getCourses(universityId: string) {
    this.courses$ = this.courseService.getCourses(universityId);
  }

  onSubmit(f) { 
    const tag = `${findCodeById(f.university, this.universities)}/${f.course}`;
    const book: Book = {
      title: f.title,
      author: f.author,
      description: f.description,
      image: f.image,
      tags: [tag],
      status: false
    };
    this.bookService.createBook(book)
    .then(() => {
      this.toastr.success('Request submitted successfully');
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      this.toastr.error(error);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

