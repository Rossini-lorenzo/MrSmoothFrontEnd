import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaLoginComponent } from './ca-login.component';

describe('CaLoginComponent', () => {
  let component: CaLoginComponent;
  let fixture: ComponentFixture<CaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
