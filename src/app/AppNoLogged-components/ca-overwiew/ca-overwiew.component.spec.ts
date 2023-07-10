import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaOverwiewComponent } from './ca-overwiew.component';

describe('CaOverwiewComponent', () => {
  let component: CaOverwiewComponent;
  let fixture: ComponentFixture<CaOverwiewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaOverwiewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaOverwiewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
