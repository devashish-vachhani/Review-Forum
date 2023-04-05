import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Subscription, switchMap, Observable } from 'rxjs';
import { ReadingListService } from '../../services/reading-list.service';
import { ReadingList } from 'src/app/models/reading-list';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AddTagComponent } from '../add-tag/add-tag.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string;
  tag: string;
  colors: Map<string, string>;
  book: Book;
  subscription: Subscription; 
  readingList$: Observable<ReadingList>;

  constructor(
    private bookService: BookService,
    private readingListService: ReadingListService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  
  ngOnInit() {
    var colorSet = new Map<string, string>()
    function test(tag) {
      if(!colorSet.has(tag)){
        colorSet.set(tag, '#' + Math.floor(Math.random()*16777215).toString(16) + "66")
      }
    }
    this.subscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.bookId = params.get('id');
        return this.bookService.getBook(this.bookId);
      })
    ).subscribe((book: Book) => {
      this.book = book;
      this.readingList$ = this.readingListService.getReadingList();
      this.book.tags.forEach(test)
      this.colors = colorSet
    });
    
    
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();


    const dialogRef = this.dialog.open(AddTagComponent, {
      height: '250px',
      width: '600px',
    });
    

    dialogRef.afterClosed().subscribe(
        data => {this.bookService.addTag(this.bookId, data)}
        
    );
  }

  async addToReadingList(book: Book) {
    await this.readingListService.addToReadingList(book);
  }

  async deleteFromReadingList(bookId: string) {
    await this.readingListService.deleteFromReadingList(bookId);
  }

  async addTag(bookId: string) {
    console.log(bookId)
    
  }

  getRandomColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16) + "66"
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
