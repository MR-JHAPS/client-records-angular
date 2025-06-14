import { EmailVerifierPipe } from './email-verifier.pipe';

describe('EmailVerifierPipe', () => {
  it('create an instance', () => {
    const pipe = new EmailVerifierPipe();
    expect(pipe).toBeTruthy();
  });
});
