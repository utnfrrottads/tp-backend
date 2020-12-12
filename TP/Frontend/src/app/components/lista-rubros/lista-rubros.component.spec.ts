import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaRubrosComponent } from './lista-rubros.component';

describe('ListaRubrosComponent', () => {
  let component: ListaRubrosComponent;
  let fixture: ComponentFixture<ListaRubrosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRubrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
