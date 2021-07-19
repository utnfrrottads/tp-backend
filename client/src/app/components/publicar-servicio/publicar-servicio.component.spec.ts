import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarServicioComponent } from './publicar-servicio.component';

describe('PublicarServicioComponent', () => {
  let component: PublicarServicioComponent;
  let fixture: ComponentFixture<PublicarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
