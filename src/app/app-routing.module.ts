import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookFormComponent } from './components/book-form/book-form.component';
import { BooksComponent } from './components/books/books.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookComponent } from './components/book/book.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { BookRequestsComponent } from './components/admins/book-requests/book-requests.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books', component: BooksComponent },
  { path: 'reading-list', component: ReadingListComponent },
  { path: 'books/requests', component: BookRequestsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
