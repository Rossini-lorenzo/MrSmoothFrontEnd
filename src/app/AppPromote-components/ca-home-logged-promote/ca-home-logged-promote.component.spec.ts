import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaHomeLoggedPromoteComponent } from './ca-home-logged-promote.component';

describe('CaHomeLoggedPromoteComponent', () => {
  let component: CaHomeLoggedPromoteComponent;
  let fixture: ComponentFixture<CaHomeLoggedPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaHomeLoggedPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaHomeLoggedPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
