import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaNavbarLoggedComponent } from './ca-navbar-logged.component';

describe('CaNavbarLoggedComponent', () => {
  let component: CaNavbarLoggedComponent;
  let fixture: ComponentFixture<CaNavbarLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaNavbarLoggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaNavbarLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
