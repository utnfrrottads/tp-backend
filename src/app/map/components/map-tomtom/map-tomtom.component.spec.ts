import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTomtomComponent } from './map-tomtom.component';

describe('MapTomtomComponent', () => {
  let component: MapTomtomComponent;
  let fixture: ComponentFixture<MapTomtomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTomtomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTomtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
