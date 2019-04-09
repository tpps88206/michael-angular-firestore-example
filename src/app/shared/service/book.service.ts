import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { BookModel } from '../model/book.model';
import { AppConfig } from '../../config/app.config';
import { storeTimeObject } from './store.time.function';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksCollection: AngularFirestoreCollection<BookModel>;

  constructor(private afs: AngularFirestore,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.booksCollection = this.afs.collection<BookModel>(AppConfig.routes.book, (book) => {
      return book.orderBy('date', 'desc');
    });
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getBooks(): Observable<BookModel[]> {
    return this.booksCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new BookModel({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => console.log(`fetched books`)),
        catchError(BookService.handleError('getBooks', []))
      );
  }

  getBook(id: string): Observable<any> {
    return this.afs.doc(`${AppConfig.routes.books}/${id}`).get().pipe(
      map((book) => {
        return new BookModel({id, ...book.data()});
      }),
      tap(() => console.log(`fetched book ${id}`)),
      catchError(BookService.handleError('getBook', []))
    );
  }

  createBook(book: BookModel): Promise<DocumentReference> {
    console.log(book);
    return this.booksCollection.add(storeTimeObject(JSON.parse(JSON.stringify(book))));
  }

  updateBook(book: BookModel): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.books}/${book.id}`)
      .update(storeTimeObject(JSON.parse(JSON.stringify(book)), false)).then(() => {
      console.log(`updated book w/ id=${book.id}`);
    });
  }

  deleteBook(id: string): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.books}/${id}`).delete();
  }
}
