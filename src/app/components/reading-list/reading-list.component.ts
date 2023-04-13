import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReadingListService } from '../../services/reading-list.service';
import { Subscription, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['cover', 'title', 'author', 'actions' ];
  dataSource = new MatTableDataSource<Book>();
  subscription: Subscription;
  uid: string;

  constructor(
    private authService: AuthService,
    private readingListService: ReadingListService,
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.uid = this.authService.uid;
    if(!this.uid) {
      this.subscription = this.authService.currentUser$
                                              .pipe(
                                                switchMap(user => {
                                                  this.uid = user.uid;
                                                  return this.readingListService.getReadingList(this.uid)
                                                })
                                              )
                                              .subscribe(readingList => this.dataSource.data = readingList.books);
    } else {
      this.subscription = this.readingListService.getReadingList(this.uid).subscribe(readingList => this.dataSource.data = readingList.books);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async deleteFromReadingList(bookId: string) {
    await this.readingListService.deleteFromReadingList(this.uid, bookId);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}