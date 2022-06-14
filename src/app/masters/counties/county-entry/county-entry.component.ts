import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { County } from 'src/app/models/county';
import { State } from 'src/app/models/state';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CountyService } from 'src/app/services/county.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-county-entry',
  templateUrl: './county-entry.component.html',
  styleUrls: ['./county-entry.component.css']
})
export class CountyEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  states: State[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private stateService: StateService,
    private countyService: CountyService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    stateMasterId: new FormControl('', [
      Validators.required]),
    countyName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
  });
  ngOnInit() {
    this.stateService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.states = result.list
      } else {
        this.alertify.error(result.message);
      }
    }
    );

    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.countyService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let county: County = result.model;
          this.vForm.patchValue({
            countyName: county.countyName,
            stateMasterId: county.stateMasterId
          });
        } else {
          this.alertify.error(result.message);
        }
      }
      );
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
      this.countyService.add(this.vForm.value).subscribe(result => {
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
      this.countyService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
