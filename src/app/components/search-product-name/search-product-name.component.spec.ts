import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductNameComponent } from './search-product-name.component';

describe('SearchProductNameComponent', () => {
  let component: SearchProductNameComponent;
  let fixture: ComponentFixture<SearchProductNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProductNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
