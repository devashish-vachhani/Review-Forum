import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReadingListService } from '../../services/reading-list.service';
import { Subscription, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private userService: UserService,
    private readingListService: ReadingListService,
    private snackBar: MatSnackBar,
  ) {}
  displayedColumns = [ 'cover', 'title', 'author', 'actions' ];
  dataSource = new MatTableDataSource<Book>();
  subscription: Subscription;
  uid: string;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.subscription = this.userService.appUser$
                                            .pipe(
                                              switchMap(appUser => {
                                                this.uid = appUser.id
                                                return this.readingListService.getReadingList(this.uid)
                                              })
                                            )
                                            .subscribe(readingList => this.dataSource.data = readingList.books);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async deleteFromReadingList(bookId: string) {
    try {
      await this.readingListService.deleteFromReadingList(this.uid, bookId);
      this.snackBar.open('Removed from reading list', 'Dismiss', {
        panelClass: 'success',
        duration: 5000,
      })
    }
    catch(error) {
      this.snackBar.open(error, 'Dismiss', {
        panelClass: 'error',
        duration: 5000,
      })
    }
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}