import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyAccidentDiseasesComponent } from './emergency-accident-diseases.component';

describe('EmergencyAccidentDiseasesComponent', () => {
  let component: EmergencyAccidentDiseasesComponent;
  let fixture: ComponentFixture<EmergencyAccidentDiseasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyAccidentDiseasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyAccidentDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
