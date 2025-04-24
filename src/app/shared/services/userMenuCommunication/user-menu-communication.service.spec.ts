import { TestBed } from '@angular/core/testing';

import { UserMenuCommunicationService } from './user-menu-communication.service';

describe('UserMenuCommunicationService', () => {
  let service: UserMenuCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMenuCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
