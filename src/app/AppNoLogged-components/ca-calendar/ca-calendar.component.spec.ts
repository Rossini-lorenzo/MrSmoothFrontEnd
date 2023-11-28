import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaCalendarComponent } from './ca-calendar.component';

describe('CaCalendarComponent', () => {
  let component: CaCalendarComponent;
  let fixture: ComponentFixture<CaCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaCalendarComponent]
    });
    fixture = TestBed.createComponent(CaCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
