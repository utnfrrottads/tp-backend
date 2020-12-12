import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsContainerComponent } from './products-container.component';

describe('ProductsContainerComponent', () => {
  let component: ProductsContainerComponent;
  let fixture: ComponentFixture<ProductsContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
