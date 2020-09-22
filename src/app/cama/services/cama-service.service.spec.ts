import { TestBed } from '@angular/core/testing';

import { CamaService  } from './cama-service.service';

describe('CamaService', () => {
  let service: CamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
