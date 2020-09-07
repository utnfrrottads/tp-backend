import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoItemsComponent } from './carrito-items.component';

describe('CarritoItemsComponent', () => {
  let component: CarritoItemsComponent;
  let fixture: ComponentFixture<CarritoItemsComponent>;

  beforeEach(async(() => {
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
