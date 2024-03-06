import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDialogContentComponent } from './event-dialog-content.component';

describe('EventDialogContentComponent', () => {
  let component: EventDialogContentComponent;
  let fixture: ComponentFixture<EventDialogContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDialogContentComponent]
    });
    fixture = TestBed.createComponent(EventDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
