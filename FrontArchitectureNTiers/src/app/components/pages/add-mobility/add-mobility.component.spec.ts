import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMobilityComponent } from './add-mobility.component';

describe('AddMobilityComponent', () => {
  let component: AddMobilityComponent;
  let fixture: ComponentFixture<AddMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMobilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
