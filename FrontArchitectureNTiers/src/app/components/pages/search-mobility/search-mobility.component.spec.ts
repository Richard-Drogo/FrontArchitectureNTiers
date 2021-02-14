import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMobilityComponent } from './search-mobility.component';

describe('SearchMobilityComponent', () => {
  let component: SearchMobilityComponent;
  let fixture: ComponentFixture<SearchMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMobilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
