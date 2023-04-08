import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Subscription, switchMap, Observable } from 'rxjs';
import { ReadingListService } from '../../services/reading-list.service';
import { ReadingList } from 'src/app/models/reading-list';
import { MatDialog } from "@angular/material/dialog";
import { TagComponent } from '../tag/tag.component';
import { arrayUnion } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book;
  subscription: Subscription; 
  readingList$: Observable<ReadingList>;

  constructor(
    private bookService: BookService,
    private readingListService: ReadingListService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}
  
  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
      switchMap(params => {
        return this.bookService.getBook(params.get('id'));
      })
    ).subscribe((book: Book) => {
      this.book = book;
      this.readingList$ = this.readingListService.getReadingList();
    });
  }

  async addToReadingList() {
    await this.readingListService.addToReadingList(this.book);
  }

  async deleteFromReadingList() {
    await this.readingListService.deleteFromReadingList(this.book.id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TagComponent, {
      height: '250px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(tag => {
      if(tag) {
        if(this.book.hasTag(tag)) {
          this.snackBar.open('Tag already exists', 'Dismiss', {
            panelClass: 'warning',
        })
        } else {
          const data = {
            tags: arrayUnion(tag)
          } 
          this.bookService.updateBook(this.book.id, data);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
