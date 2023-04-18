import { Component, OnDestroy, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { University } from 'src/app/models/university';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private bookService: BookService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    ) {}
    universitySubscription: Subscription;
    userSubscription: Subscription;
    universities: University[];
    courses: string[];
    username: string;

  ngOnInit(): void {
    this.universitySubscription = this.universityService.getUniversities().subscribe(universities => this.universities = universities);
    this.userSubscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);
  }

  updateCourses(universityCode: string) {
    const selectedUniversity = this.universities.find(university => university.code === universityCode);
    this.courses = selectedUniversity ? selectedUniversity.courses : [];
  }

  async onSubmit(f) { 
    const tag = `${f.university}/${f.course}`;
    const book = new Book(
      f.title,
      f.author,
      f.description,
      f.image,
      [tag],
      "pending",
      this.username,
    );
    try {
      await this.bookService.createBook(book);
      this.snackBar.open('Book request was submitted', 'Dismiss', {
        panelClass: 'success',
        duration: 5000,
      })
      this.router.navigate(['/books']);
    }
    catch (error) {
      this.snackBar.open(error, 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  ngOnDestroy() {
    this.universitySubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}

