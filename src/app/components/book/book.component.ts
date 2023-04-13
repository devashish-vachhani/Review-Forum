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
import { UserService } from 'src/app/services/user.service';
import { AppUser } from 'src/app/models/user';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book;
  bookSubscription: Subscription; 
  readingListSubscription: Subscription;
  readingList: ReadingList;
  appUser: AppUser;

  constructor(
    private bookService: BookService,
    private readingListService: ReadingListService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {}
  
  ngOnInit() {

    this.bookSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        return this.bookService.getBook(params.get('id'));
      })
    ).subscribe((book: Book) => this.book = book);

    this.readingListSubscription = this.userService.appUser$
                                        .pipe(
                                          switchMap(appUser => {
                                            this.appUser = appUser;
                                            return this.readingListService.getReadingList(this.appUser.id);
                                          })
                                        )
                                        .subscribe(readingList => this.readingList = readingList)
  }

  async addToReadingList() {
    await this.readingListService.addToReadingList(this.appUser.id, this.book);
  }

  async deleteFromReadingList() {
    await this.readingListService.deleteFromReadingList(this.appUser.id, this.book.id);
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
    this.bookSubscription.unsubscribe();
    this.readingListSubscription.unsubscribe();
  }
}
