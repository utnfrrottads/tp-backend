import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciasByTipoChartComponent } from './emergencias-by-tipo-chart.component';

describe('EmergenciasByTipoChartComponent', () => {
  let component: EmergenciasByTipoChartComponent;
  let fixture: ComponentFixture<EmergenciasByTipoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergenciasByTipoChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergenciasByTipoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
