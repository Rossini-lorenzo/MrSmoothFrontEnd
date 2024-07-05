import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScManageAutomaticMessageComponent } from './sc-manage-automatic-message.component';

describe('ScManageAutomaticMessageComponent', () => {
  let component: ScManageAutomaticMessageComponent;
  let fixture: ComponentFixture<ScManageAutomaticMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScManageAutomaticMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScManageAutomaticMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
