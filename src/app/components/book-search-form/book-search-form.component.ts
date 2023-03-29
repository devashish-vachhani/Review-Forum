import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'app-book-search-form',
  templateUrl: './book-search-form.component.html',
  styleUrls: ['./book-search-form.component.css']
})
export class BookSearchFormComponent {
  universities$;
  searchMode: string = 'byTitle';
  searchModeLabel: string = 'I want to find books by university';
  selectedUniversity: string = '';
  searchTerm = '';

  constructor(
    private router: Router,
    private universityService: UniversityService
    ) {
        this.universities$ = this.universityService.getUniversities();
  }

  toggleSearchMode() {
    if (this.searchMode === 'byTitle') {
      this.searchMode = 'byUniversity';
      this.searchModeLabel = 'I want to find books by title';
    } else {
      this.searchMode = 'byTitle';
      this.searchModeLabel = 'I want to find books by university';
    }
  }

  onSubmit() {
    if (this.searchMode === 'byTitle') {
      this.router.navigate(['/books'], {
        queryParams: { title: this.searchTerm},
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['/books'], {
        queryParams: { university: this.selectedUniversity},
        queryParamsHandling: 'merge',
      });
    }
  }

  onClear() {
    this.searchTerm = '';
  }
}
