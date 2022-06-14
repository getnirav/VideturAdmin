import { TestBed } from '@angular/core/testing';

import { LatePaymentChargesService } from './late-payment-charges.service';

describe('LatePaymentChargesService', () => {
  let service: LatePaymentChargesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatePaymentChargesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
