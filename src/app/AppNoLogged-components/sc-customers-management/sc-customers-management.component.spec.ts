import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScCustomersManagementComponent } from './sc-customers-management.component';

describe('ScCustomersManagementComponent', () => {
  let component: ScCustomersManagementComponent;
  let fixture: ComponentFixture<ScCustomersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScCustomersManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScCustomersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
