import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { BookService } from 'src/app/services/book.service';
import { Book } from '../model/book.model';
import { Sage } from '../model/sage.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: [],
})
export class BookComponent implements OnInit {
  public newBook: boolean = true;
  public allSages!: Sage[];
  public bookForm!: FormGroup;
  public bookSelected!: Book;
  public sageSelected!: Sage;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadBook(id);
    });

    this.loadBookSage();
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      year: [''],
      author: [''],
      sage: [''],
      orderSage: [''],
      fileYear: [''],
      digital: [''],
      notes: [''],
      creationDate: [''],
      id: [''],
    });
  }

  loadBook(idParam: number) {
    this.bookService.getBookById(idParam).subscribe((book: any) => {
      this.bookSelected = {
        ...book,
      };
      this.bookSelected.id = idParam;
      //TODO no se selecciona saga
      this.bookForm.setValue(this.bookSelected);
    });
  }

  loadBookSage() {
    this.bookService.loadBookSages().subscribe((sages: any) => {
      this.allSages = sages;
    });
  }

  saveBook() {
    const { title } = this.bookForm.value;

    this.bookService
      .createOrUpdateBook(this.bookForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Created', `${title} => created correctly!!!`, 'success');
        this.sageSelected = resp.sage;
        this.bookSelected = resp;
        this.router.navigateByUrl(`/tecas/books/${resp.id}`);
        //TODO confirmación si ir al listado o crear otro
      });
  }
}
