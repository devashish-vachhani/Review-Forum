import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.scss']
})
export class BookRequestsComponent implements OnInit, OnDestroy {
  displayedColumns = ['cover', 'title', 'author', 'description', 'tags', 'actions' ];
  dataSource = new MatTableDataSource<Book>();
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.subscription = this.bookService.getBooks(false).subscribe(books => {
      this.dataSource.data = books;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async accept(bookId: string) {
    const data = {
      status: true,
    }
    try {
      await this.bookService.updateBook(bookId, data);
      this.snackBar.open('Book request was accepted', 'Dismiss', {
        panelClass: 'success',
        duration: 3000,
      })
    }
    catch(error) {
      this.snackBar.open('Book request could not be accepted', 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  async decline(bookId: string) {
    try {
      await this.bookService.deleteBook(bookId)
      this.snackBar.open('Book request was declined', 'Dismiss', {
        panelClass: 'success',
        duration: 3000,
      })
    }
    catch(error) {
      this.snackBar.open('Book request could not be declined', 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
