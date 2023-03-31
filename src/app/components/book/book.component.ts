import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string;
  book: Book;
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.subscription = this.route.paramMap
    .pipe(
      switchMap(params => {
        this.bookId = params.get('id');
        return this.bookService.getBook(this.bookId)
      })
    )
    .subscribe(book => this.book = book);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
