import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Observable, Subscription, tap } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[];
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.subscription = this.bookService.getBooks().subscribe(books => {
          this.books = (books as Book[]);
            if(params['title']) this.books = this.books.filter(book => book.title.includes(params['title']));
            else if(params['university']) this.books = this.books.filter(book => book.tags.some(tag => tag.includes(params['university'])));
        });
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
