import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPorCategoriasComponent } from './servicios-por-categorias.component';

describe('ServiciosPorCategoriasComponent', () => {
  let component: ServiciosPorCategoriasComponent;
  let fixture: ComponentFixture<ServiciosPorCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosPorCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosPorCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
