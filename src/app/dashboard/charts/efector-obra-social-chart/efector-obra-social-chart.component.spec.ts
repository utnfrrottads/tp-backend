import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectorObraSocialChartComponent } from './efector-obra-social-chart.component';

describe('EfectorObraSocialChartComponent', () => {
  let component: EfectorObraSocialChartComponent;
  let fixture: ComponentFixture<EfectorObraSocialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfectorObraSocialChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfectorObraSocialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
