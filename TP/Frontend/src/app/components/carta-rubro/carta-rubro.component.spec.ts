import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartaRubroComponent } from './carta-rubro.component';

describe('CartaRubroComponent', () => {
  let component: CartaRubroComponent;
  let fixture: ComponentFixture<CartaRubroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
