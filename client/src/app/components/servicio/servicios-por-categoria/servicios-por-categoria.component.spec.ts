import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPorCategoriaComponent } from './servicios-por-categoria.component';

describe('ServiciosPorCategoriaComponent', () => {
  let component: ServiciosPorCategoriaComponent;
  let fixture: ComponentFixture<ServiciosPorCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosPorCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
