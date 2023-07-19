import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaChestComponent } from './ca-chest.component';

describe('CaChestComponent', () => {
  let component: CaChestComponent;
  let fixture: ComponentFixture<CaChestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaChestComponent]
    });
    fixture = TestBed.createComponent(CaChestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
