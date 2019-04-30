import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AppConfig } from '../../../shared/config/app.config';
import { UserService } from '../../../shared/service/user/user.service';
import { AuthService } from '../../../shared/service/auth/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  appName = AppConfig.appName;

  userMenu = [{ title: 'Log out', link: 'auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private authService: AuthService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.userService) {
      this.user = null;
      this.userService.getUser()
        .subscribe((user: any) => {
          this.user = user;
        });
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  login() {
    this.router.navigate(['auth/login']);
  }
}
