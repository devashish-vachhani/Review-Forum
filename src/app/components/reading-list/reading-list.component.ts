import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReadingListService } from '../../services/reading-list.service';
import { Observable, Subscription } from 'rxjs';
import { ReadingList } from 'src/app/models/reading-list';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit, AfterViewInit, OnDestroy {
  readingList$: Observable<ReadingList>;
  displayedColumns = ['cover', 'title', 'author', 'actions' ];
  dataSource = new MatTableDataSource<Book>();
  subscription: Subscription;

  constructor(
    private readingListService: ReadingListService,
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.subscription = this.readingListService.getReadingList().subscribe(readingList => {
      this.dataSource.data = readingList.books;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async deleteFromReadingList(bookId: string) {
    await this.readingListService.deleteFromReadingList(bookId);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
