import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleMaster } from 'src/app/models/module-master';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ModuleMasterService } from 'src/app/services/module-master.service';

@Component({
  selector: 'app-module-master-entry',
  templateUrl: './module-master-entry.component.html',
  styleUrls: ['./module-master-entry.component.css']
})
export class ModuleMasterEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private moduleMasterService: ModuleMasterService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    moduleName: new FormControl('', [
      Validators.required]),
    roleHyrarchy: new FormControl('0'),
    sortOrder: new FormControl('0'),
  });

  ngOnInit() {

    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.moduleMasterService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let moduleMaster: ModuleMaster = result.model;
          this.vForm.patchValue({
            moduleName: moduleMaster.moduleName,
            roleHyrarchy: moduleMaster.roleHyrarchy,
            sortOrder: moduleMaster.sortOrder
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
      this.moduleMasterService.add(this.vForm.value).subscribe(result => {
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
      this.moduleMasterService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
