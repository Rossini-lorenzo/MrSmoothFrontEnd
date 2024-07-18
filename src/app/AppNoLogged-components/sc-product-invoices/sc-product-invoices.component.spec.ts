import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScProductInvoicesComponent } from './sc-product-invoices.component';

describe('ScProductInvoicesComponent', () => {
  let component: ScProductInvoicesComponent;
  let fixture: ComponentFixture<ScProductInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScProductInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScProductInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
