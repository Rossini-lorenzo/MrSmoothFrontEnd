import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScServicesManagementComponent } from './sc-services-management.component';

describe('ScServicesManagementComponent', () => {
  let component: ScServicesManagementComponent;
  let fixture: ComponentFixture<ScServicesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScServicesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScServicesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
