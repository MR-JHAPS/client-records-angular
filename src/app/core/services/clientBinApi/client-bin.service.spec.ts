import { TestBed } from '@angular/core/testing';

import { ClientBinService } from './client-bin.service';

describe('ClientBinService', () => {
  let service: ClientBinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
