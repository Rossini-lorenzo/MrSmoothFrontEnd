import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaGestisciAttivitaPromoteComponent } from './ca-gestisci-attivita-promote.component';

describe('CaGestisciAttivitaPromoteComponent', () => {
  let component: CaGestisciAttivitaPromoteComponent;
  let fixture: ComponentFixture<CaGestisciAttivitaPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaGestisciAttivitaPromoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaGestisciAttivitaPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
