import { TestBed } from '@angular/core/testing';

import { ProductCardsService } from './product-cards.service';

describe('ProductCardsService', () => {
  let service: ProductCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
