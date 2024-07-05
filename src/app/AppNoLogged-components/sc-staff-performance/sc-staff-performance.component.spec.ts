import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScStaffPerformanceComponent } from './sc-staff-performance.component';

describe('ScStaffPerformanceComponent', () => {
  let component: ScStaffPerformanceComponent;
  let fixture: ComponentFixture<ScStaffPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScStaffPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScStaffPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
