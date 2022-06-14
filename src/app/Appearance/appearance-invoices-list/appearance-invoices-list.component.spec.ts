import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceInvoicesListComponent } from './appearance-invoices-list.component';

describe('AppearanceInvoicesListComponent', () => {
  let component: AppearanceInvoicesListComponent;
  let fixture: ComponentFixture<AppearanceInvoicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppearanceInvoicesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearanceInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
