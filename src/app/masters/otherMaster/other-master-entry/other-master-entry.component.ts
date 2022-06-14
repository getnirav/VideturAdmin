import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtherMaster, OtherMasterType } from 'src/app/models/other-master';
import { AlertifyService } from 'src/app/services/alertify.service';
import { OtherMasterService } from 'src/app/services/other-master.service';

@Component({
  selector: 'app-other-master-entry',
  templateUrl: './other-master-entry.component.html',
  styleUrls: ['./other-master-entry.component.css']
})
export class OtherMasterEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  OmTypes: OtherMasterType[] = [];


  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private otherMasterService: OtherMasterService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    recordType: new FormControl('', [
      Validators.required]),
    recordName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    description: new FormControl(''),
  });
  ngOnInit() {
    this.otherMasterService.getTypeAll().subscribe(result => {
      if (result.isSuccess) {
        this.OmTypes = result.list;
      }
    });

    if (this.autoId != 0) {


      this.otherMasterService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let otherMaster: OtherMaster = result.model;
          this.vForm.patchValue({
            recordType: otherMaster.recordType,
            recordName: otherMaster.recordName,
            description: otherMaster.description
          });
        } else {
          this.alertify.error(result.message);
        }
      });

      //   (res) => {
      //   // console.log(res);
      //   let otherMaster: OtherMaster = res;
      //   this.vForm.patchValue({
      //     recordType: otherMaster.recordType,
      //     recordName: otherMaster.recordName,
      //     description: otherMaster.description
      //   });
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Server not responding!');
      //   });
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
      this.otherMasterService.add(this.vForm.value).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
      //   (res) => {
      //   console.log(res);
      //   this.alertify.success('Data saved successfully.');
      //   location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   });
    }
    else {
      this.otherMasterService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
      //   (res) => {

      //   this.alertify.success('Data saved successfully.');
      //   window.location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   });
    }
    this.activeModal.close();
  }
}
