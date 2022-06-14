import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReceiptListComponent } from './invoice-receipt-list.component';

describe('InvoiceReceiptListComponent', () => {
  let component: InvoiceReceiptListComponent;
  let fixture: ComponentFixture<InvoiceReceiptListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceReceiptListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceReceiptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
