import { Component, OnDestroy, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { University } from 'src/app/models/university';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  universities: University[];
  courses: string[];

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private bookService: BookService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.subscription = this.universityService.getUniversities().subscribe(universities => this.universities = universities);
  }

  updateCourses(universityCode: string) {
    const selectedUniversity = this.universities.find(university => university.code === universityCode);
    this.courses = selectedUniversity ? selectedUniversity.courses : [];
  }

  onSubmit(f) { 
    const tag = `${f.university}/${f.course}`;
    const book = new Book(
      f.title,
      f.author,
      f.description,
      f.image,
      [tag],
      false
    );
    this.bookService.createBook(book)
    .then(() => {
      this.toastr.success('Request submitted successfully');
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      this.toastr.error(error);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

