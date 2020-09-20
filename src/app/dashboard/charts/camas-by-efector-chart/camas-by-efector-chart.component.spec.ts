import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CamasByEfectorChartComponent } from './camas-by-efector-chart.component';

describe('CamasByEfectorComponent', () => {
  let component: CamasByEfectorChartComponent;
  let fixture: ComponentFixture<CamasByEfectorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamasByEfectorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamasByEfectorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
