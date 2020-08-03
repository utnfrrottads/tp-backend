import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirProductoComponent } from './subir-producto.component';

describe('SubirProductoComponent', () => {
  let component: SubirProductoComponent;
  let fixture: ComponentFixture<SubirProductoComponent>;

  beforeEach(async(() => {
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
