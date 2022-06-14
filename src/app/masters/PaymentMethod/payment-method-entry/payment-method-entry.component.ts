import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentMethod } from 'src/app/models/payment-method';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-payment-method-entry',
  templateUrl: './payment-method-entry.component.html',
  styleUrls: ['./payment-method-entry.component.css']
})
export class PaymentMethodEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private paymentMethodService: PaymentMethodService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    paymentImage: new FormControl(''),
    paymentCode: new FormControl(''),
    paymentDescription: new FormControl(''),
    paymentChargesPercentage: new FormControl(),
    paymentChargesFixed: new FormControl(),
  });
  ngOnInit() {
    if (this.autoId != 0) {
      this.paymentMethodService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let paymentMethod: PaymentMethod = result.model;
          this.vForm.patchValue({
            paymentImage: paymentMethod.paymentImage,
            paymentCode: paymentMethod.paymentCode,
            paymentDescription: paymentMethod.paymentDescription,
            paymentChargesPercentage: paymentMethod.paymentChargesPercentage,
            paymentChargesFixed: paymentMethod.paymentChargesFixed
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
      this.paymentMethodService.add(this.vForm.value).subscribe(result => {
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
      this.paymentMethodService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
