import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'admin-book-requests',
  templateUrl: './admin-book-requests.component.html',
  styleUrls: ['./admin-book-requests.component.scss']
})
export class AdminBookRequestsComponent implements OnInit, OnDestroy {
  displayedColumns = ['cover', 'title', 'author', 'description', 'tags', 'actions' ];
  dataSource = new MatTableDataSource<Book>();
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.subscription = this.bookService.getBooks("pending").subscribe(books => {
      this.dataSource.data = books;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async approve(bookId: string) {
    const data = {
      status: "approved",
    }
    try {
      await this.bookService.updateBook(bookId, data);
      this.snackBar.open('Book request was accepted', 'Dismiss', {
        panelClass: 'success',
        duration: 3000,
      })
    }
    catch(error) {
      console.log(error);
      this.snackBar.open('Book request could not be accepted', 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  async decline(bookId: string) {
    const data = {
      status: "declined",
    }
    try {
      await this.bookService.updateBook(bookId, data);
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
