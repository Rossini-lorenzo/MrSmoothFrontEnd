import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScProductsManagementComponent } from './sc-products-management.component';

describe('ScProductsManagementComponent', () => {
  let component: ScProductsManagementComponent;
  let fixture: ComponentFixture<ScProductsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScProductsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScProductsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
