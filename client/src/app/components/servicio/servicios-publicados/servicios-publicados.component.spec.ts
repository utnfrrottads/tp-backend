import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosPublicadosComponent } from './servicios-publicados.component';

describe('ServiciosPublicadosComponent', () => {
  let component: ServiciosPublicadosComponent;
  let fixture: ComponentFixture<ServiciosPublicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosPublicadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosPublicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
