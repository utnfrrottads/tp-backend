import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarritoConfirmComponent } from './carrito-confirm.component';

describe('CarritoConfirmComponent', () => {
  let component: CarritoConfirmComponent;
  let fixture: ComponentFixture<CarritoConfirmComponent>;

  beforeEach(waitForAsync(() => {
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
