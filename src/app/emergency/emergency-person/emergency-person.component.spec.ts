import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyPersonComponent } from './emergency-person.component';

describe('EmergencyPersonComponent', () => {
  let component: EmergencyPersonComponent;
  let fixture: ComponentFixture<EmergencyPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
