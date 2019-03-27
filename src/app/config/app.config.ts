import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    book: 'book',
    error404: '404'
  },
  version: '2.0'
};
