import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, switchMap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-book-requests',
  templateUrl: './user-book-requests.component.html',
  styleUrls: ['./user-book-requests.component.scss']
})
export class UserBookRequestsComponent {
  displayedColumns = ['cover', 'title', 'author', 'description', 'tags', 'status' ];
  dataSource = new MatTableDataSource<Book>();
  subscription: Subscription;

  constructor(
    private bookService: BookService,
    private userService: UserService,
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.subscription = this.userService.appUser$.pipe(
      switchMap(appUser => {
        return this.bookService.getBooks(undefined, appUser.username);
      })
    )
    .subscribe(books => {
      this.dataSource.data = books;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } 
}
