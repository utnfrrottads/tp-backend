import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPurchaseComponent } from './data-purchase.component';

describe('DataPurchaseComponent', () => {
  let component: DataPurchaseComponent;
  let fixture: ComponentFixture<DataPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
