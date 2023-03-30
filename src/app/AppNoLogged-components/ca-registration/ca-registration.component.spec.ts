import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaRegistrationComponent } from './ca-registration.component';

describe('CaRegistrationComponent', () => {
  let component: CaRegistrationComponent;
  let fixture: ComponentFixture<CaRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
