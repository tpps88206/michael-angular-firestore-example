import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { DecorateModel } from '../../model/decorate.model';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class DecorateService {
  private decoratesCollection: AngularFirestoreCollection<DecorateModel>;

  constructor(private afs: AngularFirestore) {
    this.decoratesCollection = this.afs.collection<DecorateModel>(AppConfig.routes.decorate, (decorate) => {
      return decorate;
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

  getDecorates(): Observable<DecorateModel[]> {
    return this.decoratesCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new DecorateModel({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => console.log(`fetched decorates`)),
        catchError(DecorateService.handleError('getDecorates', [])),
      );
  }

  getDecorate(id: string): Observable<any> {
    return this.afs.doc(`${AppConfig.routes.decorate}/${id}`).get().pipe(
      map((decorate) => {
        return new DecorateModel({id, ...decorate.data()});
      }),
      tap(() => console.log(`fetched decorate ${id}`)),
      catchError(DecorateService.handleError('getDecorate', [])),
    );
  }

  createDecorate(decorate: DecorateModel): Promise<DocumentReference> {
    return this.decoratesCollection.add(decorate);
  }

  updateDecorate(decorate: DecorateModel): Promise<void> {
    const id = decorate.id;
    const newObj = JSON.parse(JSON.stringify(decorate));
    delete newObj.id;
    return this.afs.doc(`${AppConfig.routes.decorate}/${id}`)
      .update(newObj).then(() => {
        console.log(`updated decorate w/ id=${decorate.id}`);
      });
  }

  deleteDecorate(id: string): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.decorate}/${id}`).delete();
  }
}
