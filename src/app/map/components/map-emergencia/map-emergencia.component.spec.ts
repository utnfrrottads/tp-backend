import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEmergenciaComponent } from './map-emergencia.component';

describe('MapEmergenciaComponent', () => {
  let component: MapEmergenciaComponent;
  let fixture: ComponentFixture<MapEmergenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEmergenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
