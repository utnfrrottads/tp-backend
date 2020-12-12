import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarritoItemsComponent } from './carrito-items.component';

describe('CarritoItemsComponent', () => {
  let component: CarritoItemsComponent;
  let fixture: ComponentFixture<CarritoItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritoItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
