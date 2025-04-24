import { TestBed } from '@angular/core/testing';

import { ClientSearchCommunicationService } from './client-search-communication.service';

describe('ClientSearchCommunicationService', () => {
  let service: ClientSearchCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSearchCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
