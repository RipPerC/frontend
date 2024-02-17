import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

import { Sage } from '../../model/sage.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-booksages',
  templateUrl: './booksages.component.html',
  styleUrls: [],
})
export class BooksagesComponent implements OnInit {
  public allSages: Sage[] = [];
  public allSagesAux: Sage[] = [];
  public pages: number = 1;
  public perPage: number = 10;
  public total: number = 0;
  public loading: boolean = true;
  public itemsPerPage = [5, 10, 50, 100];
  public txtSearch: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadSages();
  }

  loadSages(): void {
    this.loading = true;
    this.bookService.loadBookSages().subscribe((response: any) => {
      this.allSages = response;
      this.allSagesAux = response;
      this.total = this.allSages.length;
      this.loading = false;
    });
  }

  assignPerPage(size: any) {
    this.perPage = size;
    this.loadSages();
  }

  editSage(sage: Sage) {
    this.bookService.updateSage(sage).subscribe((resp) => {
      Swal.fire('Updated');
      this.loadSages();
    });
  }

  search() {
    if (this.txtSearch.length === 0) {
      return (this.allSages = this.allSagesAux);
    }

    this.allSages = this.allSages.filter((obj) => {
      return obj.name.toLowerCase().includes(this.txtSearch.toLowerCase());
    });

    this.total = this.allSages.length;
    return this.allSages;
  }

  newSage() {
    if (this.allSages.length == 0) {
      this.bookService.newSage(this.txtSearch).subscribe((resp: any) => {
        Swal.fire('Created');
        this.loadSages();
        this.txtSearch = '';
      });
    } else if (this.txtSearch.length > 0) {
      Swal.fire('There is at least one Sage with that name');
    } else {
      Swal.fire('Please, add a name');
    }
  }

  deleteSage(sage: Sage) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Sage to remove: ${sage.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService
          .deleteSage(sage)
          .pipe(delay(100))
          .subscribe((resp) => {
            this.loadSages();
            Swal.fire({
              title: 'Deleted!',
              text: `Book Sage: ${sage.name}`,
              icon: 'success',
            });
          });
      }
    });
  }
}
