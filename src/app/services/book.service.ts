import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sage } from '../pages/model/sage.model';
import { Book } from '../pages/model/book.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url_books = `${base_url}/book`;
  private url_booksages = `${base_url}/book/sage`;

  constructor(private http: HttpClient) {}

  loadBookSages() {
    return this.http.get(this.url_booksages);
  }

  newSage(name: string) {
    let sage = new Sage(name);
    return this.http.post(this.url_booksages, sage);
  }

  updateSage(sage: Sage) {
    return this.http.post(this.url_booksages, sage);
  }

  deleteSage(sage: Sage) {
    return this.http.delete(`${this.url_booksages}/${sage.id} `);
  }

  loadBooks() {
    return this.http.get(this.url_books);
  }

  deleteBook(book: Book) {
    return this.http.delete(`${this.url_books}/${book.id} `);
  }
}
