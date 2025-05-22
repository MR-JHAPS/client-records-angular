import { TestBed } from '@angular/core/testing';

import { UserRoleUpdatedCommunicationService } from './user-role-updated-communication.service';

describe('UserRoleUpdatedCommunicationService', () => {
  let service: UserRoleUpdatedCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoleUpdatedCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
