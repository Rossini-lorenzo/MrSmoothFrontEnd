import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScSalesArchiveComponent } from './sc-sales-archive.component';

describe('ScSalesArchiveComponent', () => {
  let component: ScSalesArchiveComponent;
  let fixture: ComponentFixture<ScSalesArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScSalesArchiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScSalesArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
