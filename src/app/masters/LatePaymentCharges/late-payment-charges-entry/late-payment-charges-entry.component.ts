import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LatePaymentCharges } from 'src/app/models/late-payment-charges';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LatePaymentChargesService } from 'src/app/services/late-payment-charges.service';

@Component({
  selector: 'app-late-payment-charges-entry',
  templateUrl: './late-payment-charges-entry.component.html',
  styleUrls: ['./late-payment-charges-entry.component.css']
})
export class LatePaymentChargesEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private latePaymentChargesService: LatePaymentChargesService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    fromDays: new FormControl(''),
    toDays: new FormControl(''),
    penaltyPercent: new FormControl(''),
    description: new FormControl(''),
  });
  ngOnInit() {
    if (this.autoId != 0) {
      this.latePaymentChargesService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let latePaymentCharges: LatePaymentCharges = result.model;
          this.vForm.patchValue({
            fromDays: latePaymentCharges.fromDays,
            toDays: latePaymentCharges.toDays,
            penaltyPercent: latePaymentCharges.penaltyPercent,
            description: latePaymentCharges.description
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
      this.latePaymentChargesService.add(this.vForm.value).subscribe(result => {
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
      this.latePaymentChargesService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
