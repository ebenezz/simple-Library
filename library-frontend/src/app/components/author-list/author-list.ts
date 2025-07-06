import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../../services/library.service';
import { Author } from '../../models/author';

// Angular Material modules needed
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RouterModule 
  ],
  templateUrl: './author-list.html',
  styleUrls: ['./author-list.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  loading = true;
  error: string | null = null;

  displayedColumns: string[] = ['name', 'bio', 'actions'];

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.libraryService.getAuthors().subscribe({
      next: (data) => {
        this.authors = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load authors.';
        this.loading = false;
      }
    });
  }

  deleteAuthor(id: number): void {
    if (!confirm('Are you sure you want to delete this author?')) return;

    this.libraryService.deleteAuthor(id).subscribe({
      next: () => {
        this.authors = this.authors.filter(author => author.id !== id);
      },
      error: () => {
        alert('Failed to delete the author.');
      }
    });
  }
}
