import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePreviewCardComponent } from './service-preview-card.component';

describe('ServicePreviewCardComponent', () => {
  let component: ServicePreviewCardComponent;
  let fixture: ComponentFixture<ServicePreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePreviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
