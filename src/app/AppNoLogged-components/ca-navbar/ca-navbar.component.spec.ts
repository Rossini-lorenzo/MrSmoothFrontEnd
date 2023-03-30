import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaNavbarComponent } from './ca-navbar.component';

describe('CaNavbarComponent', () => {
  let component: CaNavbarComponent;
  let fixture: ComponentFixture<CaNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
