import { TestBed } from '@angular/core/testing';

import { SignGuard } from './sign.guard';

describe('SignGuard', () => {
  let guard: SignGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
