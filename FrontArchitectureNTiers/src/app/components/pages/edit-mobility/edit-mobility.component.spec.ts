import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMobilityComponent } from './edit-mobility.component';

describe('EditMobilityComponent', () => {
  let component: EditMobilityComponent;
  let fixture: ComponentFixture<EditMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMobilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
