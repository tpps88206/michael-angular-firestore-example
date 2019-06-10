import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import {UserModel} from '../../model/user.model';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userService.setUser(new UserModel(this.userDetails.email, this.userDetails.displayName, this.userDetails.photoURL));
        } else {
          this.userDetails = null;
          this.userService.setUser(null);
        }
      },
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );
  }

  isLoggedIn() {
    return this.userDetails != null;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['pages/dashboard']));
  }
}
