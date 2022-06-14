import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleAction } from 'src/app/models/module-action';
import { ModuleMaster } from 'src/app/models/module-master';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ModuleActionService } from 'src/app/services/module-action.service';
import { ModuleMasterService } from 'src/app/services/module-master.service';

@Component({
  selector: 'app-module-action-entry',
  templateUrl: './module-action-entry.component.html',
  styleUrls: ['./module-action-entry.component.css']
})
export class ModuleActionEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  moduleMaster: ModuleMaster[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private moduleMasterService: ModuleMasterService,
    private moduleActionService: ModuleActionService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    moduleMasterId: new FormControl('', [
      Validators.required]),
    actionName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)])
  });

  ngOnInit() {
    this.moduleMasterService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.moduleMaster = result.list;
      }
    });

    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.moduleActionService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let moduleAction: ModuleAction = result.model;
          this.vForm.patchValue({
            moduleMasterId: moduleAction.moduleMasterId,
            actionName: moduleAction.actionName
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
      this.moduleActionService.add(this.vForm.value).subscribe(result => {
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
      this.moduleActionService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
