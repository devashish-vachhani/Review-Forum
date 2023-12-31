import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Subscription, switchMap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}
  books: Book[];
  filteredBooks: Book[];
  subscription: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.bookService.getBooks("approved")
                        .pipe(
                          switchMap(books => {
                            this.books = books;
                            return this.route.queryParams;
                          })
                        )
                        .subscribe(params => {
                          if(params['title']) {
                            this.filteredBooks = this.books.filter(book => (book.title.toLowerCase()).includes((params['title'].toLowerCase())));
                          } else if(params['university']) {
                            this.filteredBooks = this.books.filter(book => book.tags.some(tag => tag.includes(params['university'])));
                          } else {
                            this.filteredBooks = this.books
                          }
                        })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
