import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatChipsModule } from '@angular/material/chips'
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { BookService } from './services/book.service';
import { HotToastModule } from '@ngneat/hot-toast';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { UniversityService } from './services/university.service';
import { BooksComponent } from './components/books/books.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { BookComponent } from './components/book/book.component';
import { ReadingListService } from './services/reading-list.service';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { TagComponent } from './components/tag/tag.component';
import { ReviewService } from './services/review.service';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { ReviewComponent } from './components/review/review.component';
import { BookRequestsComponent } from './components/admins/book-requests/book-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    SignupFormComponent,
    BookFormComponent,
    BooksComponent,
    BookComponent,
    ReadingListComponent,
    TagComponent,
    ReviewsComponent,
    NewReviewComponent,
    CommentsComponent,
    ReviewComponent,
    BookSearchComponent,
    BookRequestsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgbModule,
    HotToastModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
    }),
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [
    AuthService,
    UserService,
    UniversityService,
    BookService,
    ReadingListService,
    ReviewService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:  {
                                                          verticalPosition: 'top',
                                                          horizontalPosition: 'center',
                                                        }}
  ],
  bootstrap: [AppComponent],
  entryComponents: [TagComponent]
})
export class AppModule { }
