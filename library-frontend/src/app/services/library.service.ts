import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Author } from '../models/author';


@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private bookApiUrl = 'http://localhost:5124/api/books';
  private authorApiUrl = 'http://localhost:5124/api/authors';

  constructor(private http: HttpClient) {}

  // Books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookApiUrl);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.bookApiUrl}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.bookApiUrl, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.bookApiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.bookApiUrl}/${id}`);
  }

  // Authors
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorApiUrl);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.authorApiUrl}/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorApiUrl, author);
  }

  updateAuthor(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.authorApiUrl}/${id}`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.authorApiUrl}/${id}`);
  }
}
