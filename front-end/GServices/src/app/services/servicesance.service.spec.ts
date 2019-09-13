import { TestBed } from '@angular/core/testing';

import { ServicesanceService } from './servicesance.service';

describe('ServicesanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesanceService = TestBed.get(ServicesanceService);
    expect(service).toBeTruthy();
  });
});
