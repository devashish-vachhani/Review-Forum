import { Component, OnDestroy, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { Observable, Subscription } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  universities: DocumentData[];
  courses$: Observable<DocumentData[]>;
  subscription: Subscription;

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private bookService: BookService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.subscription = this.universityService.getUniversities().subscribe(universities => {
      this.universities = universities;
    })
  }

  updateCourses(universityId: string) {
    this.courses$ = this.universityService.getCoursesByUniversity(universityId);
  }

  findUniversityCodeById(id: string): string {
    const university = this.universities.find(university => university['id'] === id);
    return university['code'];
  }

  onSubmit(f) { 
    const tag = this.findUniversityCodeById(f.university) + '/' + f.course
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
