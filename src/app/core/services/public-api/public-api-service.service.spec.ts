import { TestBed } from '@angular/core/testing';

import { PublicApiServiceService } from './public-api-service.service';

describe('PublicApiServiceService', () => {
  let service: PublicApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
