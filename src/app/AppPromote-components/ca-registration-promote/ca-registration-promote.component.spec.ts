import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaRegistrationPromoteComponent } from './ca-registration-promote.component';

describe('CaRegistrationPromoteComponent', () => {
  let component: CaRegistrationPromoteComponent;
  let fixture: ComponentFixture<CaRegistrationPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaRegistrationPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaRegistrationPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
