import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScFiltersComponent } from './sc-filters.component';

describe('ScFiltersComponent', () => {
  let component: ScFiltersComponent;
  let fixture: ComponentFixture<ScFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
