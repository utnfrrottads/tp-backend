import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContratosComponent } from './table-contratos.component';

describe('TableContratosComponent', () => {
  let component: TableContratosComponent;
  let fixture: ComponentFixture<TableContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContratosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
