import { TestBed } from '@angular/core/testing';

import { RubrosService } from './rubros.service';

describe('RubrosService', () => {
  let service: RubrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
