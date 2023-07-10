import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaScanComponent } from './ca-scan.component';

describe('CaScanComponent', () => {
  let component: CaScanComponent;
  let fixture: ComponentFixture<CaScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
