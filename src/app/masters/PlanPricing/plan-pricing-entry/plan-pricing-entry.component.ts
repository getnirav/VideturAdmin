import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanPricing } from 'src/app/models/plan-pricing';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PlanPricingService } from 'src/app/services/plan-pricing.service';

@Component({
  selector: 'app-plan-pricing-entry',
  templateUrl: './plan-pricing-entry.component.html',
  styleUrls: ['./plan-pricing-entry.component.css']
})
export class PlanPricingEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private planPricingService: PlanPricingService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    planName: new FormControl('', [
      Validators.required]),
    planPercent: new FormControl('', [
      Validators.required,
      Validators.min(0)]),
    description: new FormControl(''),
    sortOrder: new FormControl(''),
    defaultPlan: new FormControl(),
  });
  ngOnInit() {
    if (this.autoId != 0) {
      this.planPricingService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let planPricing: PlanPricing = result.model;
          this.vForm.patchValue({
            planName: planPricing.planName,
            planPercent: planPricing.planPercent,
            description: planPricing.description,
            sortOrder: planPricing.sortOrder,
            defaultPlan: planPricing.defaultPlan
          });
        } else {
          this.alertify.error(result.message);
        }
      });

    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    if (this.autoId == 0) {
      this.planPricingService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    else {
      this.planPricingService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );

    }
    this.activeModal.close();
  }
}
