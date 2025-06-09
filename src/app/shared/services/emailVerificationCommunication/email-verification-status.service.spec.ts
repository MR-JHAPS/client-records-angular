import { TestBed } from '@angular/core/testing';

import { EmailVerificationStatusService } from './email-verification-status.service';

describe('EmailVerificationStatusService', () => {
  let service: EmailVerificationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailVerificationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
