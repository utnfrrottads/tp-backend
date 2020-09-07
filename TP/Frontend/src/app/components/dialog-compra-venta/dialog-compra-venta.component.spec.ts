import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompraVentaComponent } from './dialog-compra-venta.component';

describe('DialogCompraVentaComponent', () => {
  let component: DialogCompraVentaComponent;
  let fixture: ComponentFixture<DialogCompraVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCompraVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompraVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
