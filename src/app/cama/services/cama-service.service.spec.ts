import { TestBed } from '@angular/core/testing';

import { CamaServiceService } from './cama-service.service';

describe('CamaServiceService', () => {
  let service: CamaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
