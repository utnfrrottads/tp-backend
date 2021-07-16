import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriasComponent } from './list-categorias.component';

describe('ListCategoriasComponent', () => {
  let component: ListCategoriasComponent;
  let fixture: ComponentFixture<ListCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
