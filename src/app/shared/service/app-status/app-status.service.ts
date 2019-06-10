import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker/src/low_level';
import { BehaviorSubject, merge, fromEvent, of, interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppStatusService {
  swUpdates = new BehaviorSubject('');

  constructor(private updates: SwUpdate) {
    // programmatically check for updates every 60 seconds
    interval(60000).subscribe(() => this.updates.checkForUpdate());

    // Notify the service when a new service worker version is available
    this.updates.available.subscribe((event: UpdateAvailableEvent) => {
      console.log('[ Available ] current version: ', event.current);
      console.log('[ Available ] available version: ', event.available);

      if (event.available) {
        // notify subscribers of a new app version
        this.swUpdates.next(event.available.hash.slice(0, 4));
      }
    });

    // Notify the service when service worker starts serving a new version of the application immediately
    this.updates.activated.subscribe((event: UpdateActivatedEvent) => {
      console.log('[ Activated ] old version was: ', event.previous);
      console.log('[ Activated ] new version is: ', event.current);
    });
  }

  // update & reload the application when new assets have been download
  reloadApp() {
    /**
     * Calls post message to the Service Workers inner scope (ACTIVATE_UPDATE)
     * https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
     */
    return this.updates.activateUpdate().then(() => document.location.reload());
  }

  // an observable of available service worker updates
  get updateAvailable() {
    return this.swUpdates.asObservable();
  }

  // the online status of the application
  get online() {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
    );
  }
}
