import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaHomeLoggedComponent } from './ca-home-logged.component';

describe('CaHomeLoggedComponent', () => {
  let component: CaHomeLoggedComponent;
  let fixture: ComponentFixture<CaHomeLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaHomeLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaHomeLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
