import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualCamasChartComponent } from './annual-camas-chart.component';

describe('AnnualCamasChartComponent', () => {
  let component: AnnualCamasChartComponent;
  let fixture: ComponentFixture<AnnualCamasChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualCamasChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualCamasChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
