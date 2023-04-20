import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../../services/university.service';
import { Observable } from 'rxjs';
import { University } from 'src/app/models/university';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  constructor(
    private router: Router,
    private universityService: UniversityService
    ) {}

  universities$: Observable<University[]>;
  searchMode: string = 'byTitle';
  searchTerm = '';

  ngOnInit(): void {
    this.universities$ = this.universityService.getUniversities();
  }

  setSearchMode(mode: string) {
    this.searchMode = mode;
    this.searchTerm = '';
    this.router.navigate(['/books']);
  }

  onSubmit() {
    let queryParams: any = {};
  
    if (this.searchMode === 'byTitle') {
      queryParams.title = this.searchTerm;
    } else {
      queryParams.university = this.searchTerm;
    }
  
    this.router.navigate(['/books'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }  

  onClear() {
    this.searchTerm = '';
    this.router.navigate(['/books']);
  }
}
