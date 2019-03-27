import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    BookComponent
  ]
})
export class CoreModule { }
