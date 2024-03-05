import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaRegisterComponent } from './ca-register.component';

describe('CaRegisterComponent', () => {
  let component: CaRegisterComponent;
  let fixture: ComponentFixture<CaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaRegisterComponent]
    });
    fixture = TestBed.createComponent(CaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
