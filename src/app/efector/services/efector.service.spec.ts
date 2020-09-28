import { TestBed } from '@angular/core/testing';

import { EfectorService } from './efector.service';

describe('EfectorService', () => {
  let service: EfectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
