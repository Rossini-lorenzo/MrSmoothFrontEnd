import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScShopPerformanceComponent } from './sc-shop-performance.component';

describe('ScShopPerformanceComponent', () => {
  let component: ScShopPerformanceComponent;
  let fixture: ComponentFixture<ScShopPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScShopPerformanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScShopPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
