import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Subscription, switchMap, Observable } from 'rxjs';
import { ReadingListService } from '../../services/reading-list.service';
import { ReadingList } from 'src/app/models/reading-list';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string;
  book: Book;
  subscription: Subscription; 
  // bookInReadingList: boolean = true;
  readingList$: Observable<ReadingList>;

  constructor(
    private bookService: BookService,
    private readingListService: ReadingListService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.bookId = params.get('id');
        return this.bookService.getBook(this.bookId);
      })
    ).subscribe((book: Book) => {
      this.book = book;
      this.readingList$ = this.readingListService.getReadingList();
    });
  }

  async addToReadingList(book: Book) {
    await this.readingListService.addToReadingList(book);
  }

  async deleteFromReadingList(bookId: string) {
    await this.readingListService.deleteFromReadingList(bookId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
