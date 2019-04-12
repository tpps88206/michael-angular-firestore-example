import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    record: 'record',
    error404: '404',
  },
  version: '3.0',
  appName: 'puman',
  year: '2019',
};
