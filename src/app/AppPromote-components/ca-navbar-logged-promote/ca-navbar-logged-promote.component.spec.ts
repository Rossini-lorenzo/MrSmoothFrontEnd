import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaNavbarLoggedPromoteComponent } from './ca-navbar-logged-promote.component';

describe('CaNavbarLoggedPromoteComponent', () => {
  let component: CaNavbarLoggedPromoteComponent;
  let fixture: ComponentFixture<CaNavbarLoggedPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaNavbarLoggedPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaNavbarLoggedPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
