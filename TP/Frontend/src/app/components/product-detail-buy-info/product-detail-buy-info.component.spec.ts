import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailBuyInfoComponent } from './product-detail-buy-info.component';

describe('ProductDetailBuyInfoComponent', () => {
  let component: ProductDetailBuyInfoComponent;
  let fixture: ComponentFixture<ProductDetailBuyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailBuyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailBuyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
