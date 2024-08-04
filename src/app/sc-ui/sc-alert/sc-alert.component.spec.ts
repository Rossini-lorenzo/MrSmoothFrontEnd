import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAlertComponent } from './sc-alert.component';

describe('ScAlertComponent', () => {
  let component: ScAlertComponent;
  let fixture: ComponentFixture<ScAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
