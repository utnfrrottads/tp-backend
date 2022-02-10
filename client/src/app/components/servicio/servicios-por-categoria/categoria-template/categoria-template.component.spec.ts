import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTemplateComponent } from './categoria-template.component';

describe('CategoriaTemplateComponent', () => {
  let component: CategoriaTemplateComponent;
  let fixture: ComponentFixture<CategoriaTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
