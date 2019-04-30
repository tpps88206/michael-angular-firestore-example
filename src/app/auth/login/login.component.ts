import { Component, Inject } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth';
import { AuthService } from '../../shared/service/auth/auth.service';
import { Router } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth/helpers';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  redirectDelay: number = 100;

  errors: string[] = [];
  messages: string[] = [];
  user: any = { rememberMe: true };

  socialLinks: NbAuthSocialLink[] = [
    {
      title: 'google',
      icon: 'socicon-google' },
  ];

  constructor(
    protected authService: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected config = {},
    protected router: Router) {
    if (this.authService.isLoggedIn()) {
      this.redirectToDashboard();
    }
  }

  loginSocial(name) {
    if (name === 'google') {
      this.loginGoogle();
    } else {
      console.warn('No login for ' + name);
    }
  }

  loginGoogle() {
    this.authService.signInWithGoogle()
      .then((success) => {
        this.redirectToDashboard();
      })
      .catch((err) => {
        this.errors = [err];
      });
  }

  redirectToDashboard() {
    setTimeout(() => {
      this.router.navigate(['pages/dashboard']);
    }, this.redirectDelay);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
