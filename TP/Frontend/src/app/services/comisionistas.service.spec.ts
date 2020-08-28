import { TestBed } from '@angular/core/testing';

import { ComisionistasService } from './comisionistas.service';

describe('ComisionistasService', () => {
  let service: ComisionistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComisionistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
