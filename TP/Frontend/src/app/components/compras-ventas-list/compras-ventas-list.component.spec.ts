import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComprasVentasListComponent } from './compras-ventas-list.component';

describe('ComprasVentasListComponent', () => {
  let component: ComprasVentasListComponent;
  let fixture: ComponentFixture<ComprasVentasListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasVentasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasVentasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
