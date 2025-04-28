import { TestBed } from '@angular/core/testing';

import { ClientLogService } from './client-log.service';

describe('ClientLogService', () => {
  let service: ClientLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
