import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPricingEntryComponent } from './plan-pricing-entry.component';

describe('PlanPricingEntryComponent', () => {
  let component: PlanPricingEntryComponent;
  let fixture: ComponentFixture<PlanPricingEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPricingEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPricingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
