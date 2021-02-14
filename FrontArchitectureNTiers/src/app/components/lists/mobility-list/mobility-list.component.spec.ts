import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilityListComponent } from './mobility-list.component';

describe('MobilityListComponent', () => {
  let component: MobilityListComponent;
  let fixture: ComponentFixture<MobilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
