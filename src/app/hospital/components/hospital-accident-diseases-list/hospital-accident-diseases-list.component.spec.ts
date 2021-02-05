import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAccidentDiseasesListComponent } from './hospital-accident-diseases-list.component';

describe('HospitalAccidentDiseasesListComponent', () => {
  let component: HospitalAccidentDiseasesListComponent;
  let fixture: ComponentFixture<HospitalAccidentDiseasesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalAccidentDiseasesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAccidentDiseasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
