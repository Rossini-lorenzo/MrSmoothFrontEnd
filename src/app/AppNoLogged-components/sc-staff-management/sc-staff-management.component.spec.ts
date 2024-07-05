import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScStaffManagementComponent } from './sc-staff-management.component';

describe('ScStaffManagementComponent', () => {
  let component: ScStaffManagementComponent;
  let fixture: ComponentFixture<ScStaffManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScStaffManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScStaffManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
