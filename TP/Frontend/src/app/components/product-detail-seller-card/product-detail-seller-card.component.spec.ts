import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSellerCardComponent } from './product-detail-seller-card.component';

describe('ProductDetailSellerCardComponent', () => {
  let component: ProductDetailSellerCardComponent;
  let fixture: ComponentFixture<ProductDetailSellerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailSellerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailSellerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
