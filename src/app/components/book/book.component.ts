import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Subscription, switchMap } from 'rxjs';
import { ReadingListService } from '../../services/reading-list.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string;
  book: Book;
  subscription: Subscription; 
  readingList: Book[];
  bookInReadingList: boolean = true;

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
    ).subscribe(async (book: Book) => {
      this.book = book;
      this.bookInReadingList = await this.readingListService.isBookInReadingList(this.bookId);
    });
  }

  async updateReadingList(book: Book): Promise<void> {
    if(this.bookInReadingList) {
      await this.readingListService.deleteFromReadingList(book.id);
    } else {
      await this.readingListService.addToReadingList(book);
    }
    this.bookInReadingList = !this.bookInReadingList;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
