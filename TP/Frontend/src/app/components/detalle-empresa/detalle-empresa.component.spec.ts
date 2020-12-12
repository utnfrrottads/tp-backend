import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetalleEmpresaComponent } from './detalle-empresa.component';

describe('DetalleEmpresaComponent', () => {
  let component: DetalleEmpresaComponent;
  let fixture: ComponentFixture<DetalleEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
