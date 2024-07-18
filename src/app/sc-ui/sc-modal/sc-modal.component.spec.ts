import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScModalComponent } from './sc-modal.component';

describe('ScModalComponent', () => {
  let component: ScModalComponent;
  let fixture: ComponentFixture<ScModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
