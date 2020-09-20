import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamasByNivelChartComponent } from './camas-by-nivel-chart.component';

describe('CamasByNivelChartComponent', () => {
  let component: CamasByNivelChartComponent;
  let fixture: ComponentFixture<CamasByNivelChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamasByNivelChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamasByNivelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
