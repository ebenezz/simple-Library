import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Author } from '../../models/author';
import { Book } from '../../models/book';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  authors: Author[] = [];
  isEditMode = false;
  bookId?: number;

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      isbn: ['', Validators.required],
      authorId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAuthors();

    // Check if editing an existing book
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bookId = +params['id'];
        this.isEditMode = true;
        this.loadBook(this.bookId);
      }
    });
  }

  loadAuthors(): void {
    this.libraryService.getAuthors().subscribe({
      next: (data) => (this.authors = data),
      error: () => alert('Failed to load authors'),
    });
  }

  loadBook(id: number): void {
    this.libraryService.getBook(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          isbn: book.isbn,
          authorId: book.authorId,
        });
      },
      error: () => alert('Failed to load book data'),
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const book: Book = {
      id: this.bookId ?? 0,
      ...this.bookForm.value,
    };

    if (this.isEditMode) {
      this.libraryService.updateBook(book.id, book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Failed to update book'),
      });
    } else {
      this.libraryService.createBook(book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Failed to create book'),
      });
    }
  }

  resetForm(): void {
    this.bookForm.reset();
    this.isEditMode = false;
  }
}
