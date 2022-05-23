import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNivelComponent } from './update-nivel.component';

describe('UpdateNivelComponent', () => {
  let component: UpdateNivelComponent;
  let fixture: ComponentFixture<UpdateNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
