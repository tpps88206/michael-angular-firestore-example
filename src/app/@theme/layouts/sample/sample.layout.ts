import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbDialogService,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { Router } from '@angular/router';

import { StateService } from '../../../@core/utils';
import { AppStatusService } from '../../../shared/service/app-status/app-status.service';
import { DialogComponent } from '../../components';

@Component({
  selector: 'ngx-sample-layout',
  templateUrl: './sample.layout.html',
  styleUrls: ['./sample.layout.scss'],
})
export class SampleLayoutComponent implements OnDestroy, AfterViewInit {
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              private router: Router,
              private appStatus: AppStatusService,
              private dialogService: NbDialogService,
              private zone: NgZone) {
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngAfterViewInit(): void {
    this.appStatus.updateAvailable.subscribe((version) => {
        if (version) {
          console.log('version: ', version);
          window.setTimeout(() => this.checkUpdateAvailable());
        }
      },
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  checkUpdateAvailable() {
    this.dialogService.open(DialogComponent).onClose.subscribe(() =>
      this.appStatus.reloadApp(),
    );
  }

  goRouterNavigate(commands: string): void {
    this.router.navigate([commands]);
  }
}
