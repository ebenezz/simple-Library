import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Author } from '../../models/author';
import { RouterModule } from '@angular/router'; 

// Angular Material modules needed
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './author-form.html',
  styleUrls: ['./author-form.css']
})
export class AuthorFormComponent implements OnInit {
  authorForm: FormGroup;
  isEditMode = false;
  authorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.authorId = +params['id'];
        this.loadAuthor(this.authorId);
      }
    });
  }

  loadAuthor(id: number): void {
    this.libraryService.getAuthor(id).subscribe({
      next: author => this.authorForm.patchValue(author),
      error: () => alert('Failed to load author')
    });
  }

  onSubmit(): void {
    if (this.authorForm.invalid) return;

    const author: Author = {
      id: this.authorId ?? 0,
      ...this.authorForm.value,
    };

    if (this.isEditMode) {
      this.libraryService.updateAuthor(author.id, author).subscribe({
        next: () => this.router.navigate(['/authors']),
        error: () => alert('Failed to update author')
      });
    } else {
      this.libraryService.createAuthor(author).subscribe({
        next: () => this.router.navigate(['/authors']),
        error: () => alert('Failed to create author')
      });
    }
  }

  resetForm(): void {
    this.authorForm.reset();
    this.isEditMode = false;
    this.authorId = null;
  }
}
