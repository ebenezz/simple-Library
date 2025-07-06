import { Component, OnInit } from '@angular/core';  // Add OnInit
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,MatToolbarModule,
    RouterModule 
  ],
  templateUrl: './book-list.html', 
  styleUrls: ['./book-list.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  error: string | null = null;

  displayedColumns: string[] = ['title', 'isbn', 'author', 'actions'];

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.libraryService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load books.';
        this.loading = false;
      }
    });
  }

  deleteBook(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.libraryService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
      },
      error: () => {
        alert('Failed to delete the book.');
      }
    });
  }
}
