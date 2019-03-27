import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BookModel } from '../../shared/model/book.model';
import { BookService } from '../../shared/service/book.service';
import { AppConfig } from '../../config/app.config';

declare var $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, AfterViewInit {
  newItemForm: FormGroup;
  submitted = false;
  books: BookModel[];
  displayBooks = false;
  version = AppConfig.version;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.init();
    this.bookService.getBooks().subscribe((books: Array<BookModel>) => {
      this.books = books;
    });
  }

  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();
    $('.ui.calendar').calendar({
      type: 'date'
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newItemForm.controls; }

  setItemUser(userName: string) {
    this.newItemForm.patchValue({user: userName});
  }

  onSubmit(type: string) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newItemForm.invalid) {
      return;
    }

    // transfer value
    if (type === 'expenses') {
      this.newItemForm.patchValue({value: this.newItemForm.controls.value.value * -1});
    }

    this.bookService.createBook(this.newItemForm.getRawValue()).then(
      () => {
        this.init();
      },
      err => {
        console.error(err);
      }
    );
  }

  onCheck(book) {
    if (book.check) {
      const result = confirm('Are you sure to initialize this data?');
      if (result) {
        book.check = false;
      }
    } else {
      book.check = true;
    }
    this.bookService.updateBook(book);
  }

  init() {
    let user = '';
    if (this.newItemForm) {
      user = this.newItemForm.value.user;
    }
    this.submitted = false;
    this.newItemForm = this.formBuilder.group({
      value: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      user: new FormControl(user, [Validators.required]),
      check: new FormControl(false),
    });
  }
}
