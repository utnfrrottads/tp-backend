import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNivelesComponent } from './list-niveles.component';

describe('ListNivelesComponent', () => {
  let component: ListNivelesComponent;
  let fixture: ComponentFixture<ListNivelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNivelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNivelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
