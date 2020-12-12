import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubirProductoComponent } from './subir-producto.component';

describe('SubirProductoComponent', () => {
  let component: SubirProductoComponent;
  let fixture: ComponentFixture<SubirProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
