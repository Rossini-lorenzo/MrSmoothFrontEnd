import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScSummaryWarehouseComponent } from './sc-summary-warehouse.component';

describe('ScSummaryWarehouseComponent', () => {
  let component: ScSummaryWarehouseComponent;
  let fixture: ComponentFixture<ScSummaryWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScSummaryWarehouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScSummaryWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
