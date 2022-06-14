import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatePaymentChargesEntryComponent } from './late-payment-charges-entry.component';

describe('LatePaymentChargesEntryComponent', () => {
  let component: LatePaymentChargesEntryComponent;
  let fixture: ComponentFixture<LatePaymentChargesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatePaymentChargesEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatePaymentChargesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
