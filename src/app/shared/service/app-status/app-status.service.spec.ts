import { TestBed } from '@angular/core/testing';

import { AppStatusService } from './app-status.service';

describe('AppStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppStatusService = TestBed.get(AppStatusService);
    expect(service).toBeTruthy();
  });
});
