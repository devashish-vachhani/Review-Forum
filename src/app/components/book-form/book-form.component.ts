import { Component, OnDestroy, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { University } from 'src/app/models/university';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {
  universitySubscription: Subscription;
  userSubscription: Subscription;
  universities: University[];
  courses: string[];
  username: string;

  constructor(
    private router: Router,
    private universityService: UniversityService,
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.universitySubscription = this.universityService.getUniversities().subscribe(universities => this.universities = universities);
    this.username = this.userService.username;
    if(!this.username) this.userSubscription = this.userService.appUser$.subscribe(appUser => this.username = appUser.username);
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
      "pending",
      this.username,
    );
    this.bookService.createBook(book)
    .then(() => {
      this.toastr.success('Book request submitted successfully');
      this.router.navigate(['/books']);
    })
    .catch(error => {
      this.toastr.error(error);
    })
  }

  ngOnDestroy() {
    this.universitySubscription.unsubscribe();
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }
}

