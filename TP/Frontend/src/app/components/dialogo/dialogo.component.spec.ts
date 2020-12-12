import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogoComponent } from './dialogo.component';

describe('DialogoComponent', () => {
  let component: DialogoComponent;
  let fixture: ComponentFixture<DialogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
