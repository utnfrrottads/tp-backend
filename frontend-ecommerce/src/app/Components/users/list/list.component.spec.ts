import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTagComponent } from './list.component';

describe('ListTagComponent', () => {
  let component: ListTagComponent;
  let fixture: ComponentFixture<ListTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
