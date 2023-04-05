import { Component, OnInit } from '@angular/core';
import { ReadingListService } from '../../services/reading-list.service';
import { Observable } from 'rxjs';
import { ReadingList } from 'src/app/models/reading-list';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {

  constructor(
    private readingListService: ReadingListService,
  ) {}

  readingList$: Observable<ReadingList>;

  ngOnInit() {
    this.readingList$ = this.readingListService.getReadingList();
  }
}
