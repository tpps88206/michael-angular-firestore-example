export class BookModel {
  id: string;
  check: boolean;
  description: string;
  user: string;
  value: number;
  createdAt: any;
  updatedAt: any;
  date: any;

  constructor(book: any = {}) {
    this.id = book.id;
    this.check = book.check;
    this.description = book.description || '';
    this.user = book.user;
    this.value = book.value;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
    this.date = book.date;
  }
}
