import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BookService } from 'src/app/services/book.service';
import { Sage } from '../model/sage.model';
import { Book } from '../model/book.model';
import { isNull } from 'util';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: [],
})
export class BookComponent implements OnInit {
  public newBook: boolean = true;
  public allSages!: Sage[];
  public bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
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

  loadBookSage() {
    this.bookService.loadBookSages().subscribe((sages: any) => {
      this.allSages = sages;
    });
  }

  saveBook() {
    console.log(this.bookForm.value);
    console.log(this.bookForm.controls['sage'].value);

    this.bookService
      .createOrUpdateBook(this.bookForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }
}
