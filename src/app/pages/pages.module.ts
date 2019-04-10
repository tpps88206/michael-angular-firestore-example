import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  DashboardComponent,
  CreateComponent,
  ListComponent,
  NotFoundComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
