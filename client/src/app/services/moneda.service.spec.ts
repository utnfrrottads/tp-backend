import { TestBed } from '@angular/core/testing';

import { MonedaService } from './moneda.service';

describe('MonedaService', () => {
  let service: MonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
