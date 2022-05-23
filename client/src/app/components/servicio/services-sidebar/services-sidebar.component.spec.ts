import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSidebarComponent } from './services-sidebar.component';

describe('ServicesSidebarComponent', () => {
  let component: ServicesSidebarComponent;
  let fixture: ComponentFixture<ServicesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
