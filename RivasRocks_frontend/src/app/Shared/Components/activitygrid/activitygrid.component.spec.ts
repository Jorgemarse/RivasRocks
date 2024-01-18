import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGridComponent } from './activitygrid.component';

describe('CardComponent', () => {
  let component: ActivityGridComponent;
  let fixture: ComponentFixture<ActivityGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityGridComponent]
    });
    fixture = TestBed.createComponent(ActivityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
