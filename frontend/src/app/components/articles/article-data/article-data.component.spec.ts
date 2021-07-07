import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDataComponent } from './article-data.component';

describe('ArticleDataComponent', () => {
  let component: ArticleDataComponent;
  let fixture: ComponentFixture<ArticleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
