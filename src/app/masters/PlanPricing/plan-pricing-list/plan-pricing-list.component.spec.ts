import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPricingListComponent } from './plan-pricing-list.component';

describe('PlanPricingListComponent', () => {
  let component: PlanPricingListComponent;
  let fixture: ComponentFixture<PlanPricingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPricingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPricingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
