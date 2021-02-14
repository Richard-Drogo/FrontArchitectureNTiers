import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMobilityComponent } from './manage-mobility.component';

describe('ManageMobilityComponent', () => {
  let component: ManageMobilityComponent;
  let fixture: ComponentFixture<ManageMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMobilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
