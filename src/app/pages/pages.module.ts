import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserTotalComponent } from './statistics/user-total/user-total.component';
import { UserUncheckComponent } from './statistics/user-uncheck/user-uncheck.component';
import { ItemUncheckComponent } from './statistics/item-uncheck/item-uncheck.component';
import { ItemTotalComponent } from './statistics/item-total/item-total.component';
import { DecorateComponent } from './decorate/decorate.component';
import { DecorateDialogComponent } from './decorate/decorate-dialog/decorate-dialog.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  DashboardComponent,
  CreateComponent,
  ListComponent,
  NotFoundComponent,
  StatisticsComponent,
  UserTotalComponent,
  UserUncheckComponent,
  ItemUncheckComponent,
  ItemTotalComponent,
  DecorateComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    DecorateDialogComponent,
  ],
})
export class PagesModule {
}
