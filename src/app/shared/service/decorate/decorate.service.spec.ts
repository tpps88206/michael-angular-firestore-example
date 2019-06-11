import { TestBed } from '@angular/core/testing';

import { DecorateService } from './decorate.service';

describe('DecorateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecorateService = TestBed.get(DecorateService);
    expect(service).toBeTruthy();
  });
});
