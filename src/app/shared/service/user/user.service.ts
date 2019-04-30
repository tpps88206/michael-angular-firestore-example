import { Injectable } from '@angular/core';
import {Contacts, RecentUsers, User, UserData} from '../../../@core/data/users';
import { Observable, of } from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserData {

  private time: Date = new Date;
  private user: User;
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.user, type: this.types.work },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.user, type: this.types.work, time: this.time.setHours(0, 1)},
  ];

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): Observable<any> {
    return of(this.user);
  }

  getContacts(): Observable<any> {
    return of(this.contacts);
  }

  getRecentUsers(): Observable<any> {
    return of(this.recentUsers);
  }
}
