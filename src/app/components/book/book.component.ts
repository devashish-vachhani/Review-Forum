import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Observable, Subscription, tap } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  book: Book
  books: Book[];
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.subscription = this.bookService.getBook(params['id']).subscribe(book => {
        this.book = (book as Book);
      });
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
