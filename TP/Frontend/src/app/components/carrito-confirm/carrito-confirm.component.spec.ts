import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoConfirmComponent } from './carrito-confirm.component';

describe('CarritoConfirmComponent', () => {
  let component: CarritoConfirmComponent;
  let fixture: ComponentFixture<CarritoConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarritoConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
