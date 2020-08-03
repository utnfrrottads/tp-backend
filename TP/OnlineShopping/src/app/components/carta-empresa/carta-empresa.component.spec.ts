import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaEmpresaComponent } from './carta-empresa.component';

describe('CartaEmpresaComponent', () => {
  let component: CartaEmpresaComponent;
  let fixture: ComponentFixture<CartaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
