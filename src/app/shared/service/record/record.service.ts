import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RecordModel } from '../../model/record.model';
import { storeTimeObject } from './store.time.function';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private recordsCollection: AngularFirestoreCollection<RecordModel>;

  constructor(private afs: AngularFirestore) {
    this.recordsCollection = this.afs.collection<RecordModel>(AppConfig.routes.record, (record) => {
      return record.orderBy('date', 'desc');
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

  getRecords(): Observable<RecordModel[]> {
    return this.recordsCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new RecordModel({id: action.payload.doc.id, ...data});
          });
        }),
        tap(() => console.log(`fetched records`)),
        catchError(RecordService.handleError('getRecords', [])),
      );
  }

  getRecord(id: string): Observable<any> {
    return this.afs.doc(`${AppConfig.routes.record}/${id}`).get().pipe(
      map((record) => {
        return new RecordModel({id, ...record.data()});
      }),
      tap(() => console.log(`fetched record ${id}`)),
      catchError(RecordService.handleError('getRecord', [])),
    );
  }

  createRecord(record: RecordModel): Promise<DocumentReference> {
    return this.recordsCollection.add(storeTimeObject(JSON.parse(JSON.stringify(record))));
  }

  updateRecord(record: RecordModel): Promise<void> {
    const id = record.id;
    const newObj = JSON.parse(JSON.stringify(record));
    delete newObj.id;
    return this.afs.doc(`${AppConfig.routes.record}/${id}`)
      .update(storeTimeObject(newObj, false)).then(() => {
        console.log(`updated record w/ id=${record.id}`);
      });
  }

  deleteRecord(id: string): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.record}/${id}`).delete();
  }
}
