import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailCarouselComponent } from './product-detail-carousel.component';

describe('ProductDetailCarouselComponent', () => {
  let component: ProductDetailCarouselComponent;
  let fixture: ComponentFixture<ProductDetailCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
