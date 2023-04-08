import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  universities$;
  searchMode: string = 'byTitle';
  searchTerm = '';

  constructor(
    private router: Router,
    private universityService: UniversityService
    ) {
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
