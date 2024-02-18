import { Component, OnInit } from '@angular/core';

import { Book } from '../model/book.model';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

const noSort = '../../../assets/images/sort/stay.png';
const up = '../../../assets/images/sort/up.png';
const down = '../../../assets/images/sort/down.png';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: [],
})
export class BooksComponent implements OnInit {
  public allBooks: Book[] = [];
  public allBooksAux: Book[] = [];
  public pages: number = 1;
  public perPage: number = 10;
  public total: number = 0;
  public loading: boolean = true;
  public itemsPerPage = [5, 10, 50, 100];
  public sortYear: string = noSort;
  public sortTitle: string = noSort;
  public txtSearchByYear: string = '';
  public txtSearchByTitle: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.loadBooks().subscribe((response: any) => {
      this.allBooks = response;
      this.allBooksAux = response;
      this.total = this.allBooks.length;
      this.loading = false;
    });
  }

  assignPerPage(size: any) {
    this.perPage = size;
    this.loadBooks();
  }

  searchByTitle() {
    if (this.txtSearchByTitle.length === 0) {
      return (this.allBooks = this.allBooksAux);
    }

    this.allBooks = this.allBooks.filter((obj) => {
      return obj.title
        .toLowerCase()
        .includes(this.txtSearchByTitle.toLowerCase());
    });

    this.total = this.allBooks.length;
    return this.allBooks;
  }

  searchByYear() {
    if (this.txtSearchByYear.length === 0) {
      return (this.allBooks = this.allBooksAux);
    }

    this.allBooks = this.allBooks.filter((obj) => {
      if (obj.year === null) {
        return null;
      } else {
        return obj.year.toString().includes(this.txtSearchByYear);
      }
    });

    this.total = this.allBooks.length;
    return this.allBooks;
  }

  sortByYear() {
    this.sortTitle = noSort;

    if (this.sortYear === noSort) {
      this.sortYear = up;
      return this.allBooks.sort(function (f, s) {
        return f.year - s.year;
      });
    } else if (this.sortYear === up) {
      this.sortYear = down;
      return this.allBooks.sort(function (f, s) {
        return s.year - f.year;
      });
    } else if (this.sortYear === down) {
      this.sortYear = noSort;
      this.txtSearchByYear = '';
      this.txtSearchByTitle = '';
      this.loadBooks();
    }
    return;
  }

  sortByTitle() {
    this.sortYear = noSort;

    if (this.sortTitle === noSort) {
      this.sortTitle = up;
      return this.allBooks.sort(function (f, s) {
        return f.title.localeCompare(s.title);
      });
    } else if (this.sortTitle === up) {
      this.sortTitle = down;
      return this.allBooks.sort(function (f, s) {
        return s.title.localeCompare(f.title);
      });
    } else if (this.sortTitle === down) {
      this.sortTitle = noSort;
      this.txtSearchByYear = '';
      this.txtSearchByTitle = '';
      this.loadBooks();
    }
    return;
  }

  editBook(book: Book) {
    console.log(book);
  }

  deleteBook(book: Book) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Book to remove: ${book.title}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService
          .deleteBook(book)
          .pipe(delay(100))
          .subscribe((resp) => {
            this.loadBooks();
            Swal.fire({
              title: 'Deleted!',
              text: `Book: ${book.title}`,
              icon: 'success',
            });
          });
      }
    });
  }

  showBook(book: Book) {
    console.log(book);
  }
}
