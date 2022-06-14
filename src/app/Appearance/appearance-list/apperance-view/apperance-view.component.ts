import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appearance } from 'src/app/models/appearance';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppearanceService } from 'src/app/services/appearance.service';

@Component({
  selector: 'app-apperance-view',
  templateUrl: './apperance-view.component.html',
  styleUrls: ['./apperance-view.component.css']
})
export class ApperanceViewComponent implements OnInit {

  @Input() appearance: any;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private datepipe: DatePipe) { }

  vForm = new FormGroup({
    lawFirmName: new FormControl(''),
    employerName: new FormControl(''),
    practiceArea: new FormControl(''),
    appearanceType: new FormControl(''),
    caseNo: new FormControl(''),
    address: new FormControl(''),
    recordName: new FormControl(''),
    courtName: new FormControl(''),
    appearanceDateTime: new FormControl(''),
    minRate: new FormControl(''),
    maxRate: new FormControl(''),
    caseTitle: new FormControl(''),
    minExp: new FormControl(''),
    status: new FormControl('')
  });
  ngOnInit() {
    if (this.appearance != null) {
      let user: Appearance = this.appearance;
      this.vForm.patchValue({
        lawFirmName: user.lawFirmName,
        employerName: user.employerName,
        practiceArea: user.practiceArea,
        appearanceType: user.appearanceType,
        caseNo: user.caseNo,
        address: user.address,
        recordName: user.recordName,
        courtName: user.courtName,
        // appearanceDateTime: user.appearanceDateTime,
        appearanceDateTime: this.datepipe.transform(user.appearanceDateTime, 'dd-MM-yyyy HH:mm:ss'),
        minRate: user.minRate,
        maxRate: user.maxRate,
        caseTitle: user.caseTitle,
        minExp: user.minExp,
        status: user.status
      });
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }

}
