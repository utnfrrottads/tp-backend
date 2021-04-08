import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSaleComponent } from './complete-sale.component';

describe('CompleteSaleComponent', () => {
  let component: CompleteSaleComponent;
  let fixture: ComponentFixture<CompleteSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
