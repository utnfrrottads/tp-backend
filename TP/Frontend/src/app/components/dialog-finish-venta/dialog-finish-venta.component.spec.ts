import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinishVentaComponent } from './dialog-finish-venta.component';

describe('DialogFinishVentaComponent', () => {
  let component: DialogFinishVentaComponent;
  let fixture: ComponentFixture<DialogFinishVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinishVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinishVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
