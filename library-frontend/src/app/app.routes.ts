import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookFormComponent } from './components/book-form/book-form';
import { AuthorListComponent } from './components/author-list/author-list';
import { AuthorFormComponent } from './components/author-form/author-form';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/edit/:id', component: BookFormComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'authors/new', component: AuthorFormComponent },
  { path: 'authors/edit/:id', component: AuthorFormComponent }
];
