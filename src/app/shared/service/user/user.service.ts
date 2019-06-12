import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { catchError, map, tap } from 'rxjs/operators';

import { UserModel } from '../../model/user.model';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<UserModel>;
  private user: UserModel;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<UserModel>(AppConfig.routes.user, (user) => {
      return user;
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

  getUsers(): Observable<UserModel[]> {
    return this.usersCollection.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            return new UserModel(data.email, data.name, data.picture);
          });
        }),
        tap(() => console.log(`fetched users`)),
        catchError(UserService.handleError('getUsers', [])),
      );
  }

  setUser(user: UserModel): void {
    this.user = user;
    if (this.user) {
      this.updateUser().then();
    }
  }

  getUser(): Observable<any> {
    return of(this.user);
  }

  updateUser(): Promise<void> {
    return this.afs.doc(`${AppConfig.routes.user}/${this.user.email}`)
      .update({...this.user}).then(() => {
        console.log(`updated user w/ email=${this.user.email}`);
      });
  }
}
