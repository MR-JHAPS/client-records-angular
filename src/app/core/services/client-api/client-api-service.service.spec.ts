import { TestBed } from '@angular/core/testing';

import { ClientApiServiceService } from './client-api-service.service';

describe('ClientApiServiceService', () => {
  let service: ClientApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
