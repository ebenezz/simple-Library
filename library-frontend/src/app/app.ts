import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule 
  ],
  
  template: `
    <mat-toolbar color="primary">
      <span>📚 My Library</span>
      <span style="flex: 1 1 auto;"></span>
      <a mat-button routerLink="/books">Books</a>
      <a mat-button routerLink="/authors">Authors</a>

    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})


export class App {}
