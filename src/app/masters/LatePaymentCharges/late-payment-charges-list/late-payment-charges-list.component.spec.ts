import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatePaymentChargesListComponent } from './late-payment-charges-list.component';

describe('LatePaymentChargesListComponent', () => {
  let component: LatePaymentChargesListComponent;
  let fixture: ComponentFixture<LatePaymentChargesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatePaymentChargesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatePaymentChargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
