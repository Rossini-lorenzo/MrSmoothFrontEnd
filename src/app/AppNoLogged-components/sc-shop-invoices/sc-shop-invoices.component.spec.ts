import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScShopInvoicesComponent } from './sc-shop-invoices.component';

describe('ScShopInvoicesComponent', () => {
  let component: ScShopInvoicesComponent;
  let fixture: ComponentFixture<ScShopInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScShopInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScShopInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
