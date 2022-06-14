import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserRole } from 'src/app/models/admin-user-role';
import { AdminUserRolePermission } from 'src/app/models/admin-user-role-permission';
import { ModuleAction } from 'src/app/models/module-action';
import { ModuleMaster } from 'src/app/models/module-master';
import { AdminUserRolePermissionService } from 'src/app/services/admin-user-role-permission.service';
import { AdminUserRoleService } from 'src/app/services/admin-user-role.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ModuleActionService } from 'src/app/services/module-action.service';
import { ModuleMasterService } from 'src/app/services/module-master.service';

@Component({
  selector: 'app-admin-user-role-permission-entry',
  templateUrl: './admin-user-role-permission-entry.component.html',
  styleUrls: ['./admin-user-role-permission-entry.component.css']
})
export class AdminUserRolePermissionEntryComponent implements OnInit {

  @Input() autoId: number = 0;
  submitted = false;

  adminUserRole: AdminUserRole[] = [];
  moduleMaster: ModuleMaster[] = [];
  moduleAction: ModuleAction[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private moduleMasterService: ModuleMasterService,
    private moduleActionService: ModuleActionService,
    private adminUserRolePermissionService: AdminUserRolePermissionService,
    private adminUserRoleService: AdminUserRoleService,
    private alertify: AlertifyService) { }

  checkAllowed: boolean = true;

  vForm = new FormGroup({
    adminUserRoleName: new FormControl('', [
      Validators.required]),
    moduleMasterId: new FormControl('', [
      Validators.required]),
    moduleActionId: new FormControl('', [
      Validators.required]),
    permission: new FormControl('')
  });

  ngOnInit() {
    this.adminUserRoleService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.adminUserRole = result.list;
      }
    });
    this.moduleMasterService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.moduleMaster = result.list;
      }
    });

    this.moduleActionService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.moduleAction = result.list;
      }
    });
    this.checkAllowed = true;
    if (this.autoId != 0) {
      // this.vForm.controls['stateCode'].disable({ onlySelf: true });

      this.adminUserRolePermissionService.get(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          let moduleAction: AdminUserRolePermission = result.model;
          this.vForm.patchValue({
            moduleMasterId: moduleAction.moduleMasterId,
            moduleActionId: moduleAction.moduleActionId,
            adminUserRoleName: moduleAction.adminUserRoleName,
            permission: moduleAction.permission
          });
          if (this.vForm.get('permission')?.value == 'Deny')
            this.checkAllowed = false;
        } else {
          this.alertify.error(result.message);
        }
      });
    }
  }
  ChangeAction(Action: string) {
    if (Action === 'Allow')
      this.checkAllowed = true;
    else
      this.checkAllowed = false;
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    if (this.checkAllowed)
      this.vForm.patchValue({ 'permission': 'Allow' });
    else this.vForm.patchValue({ 'permission': 'Deny' });
    if (this.autoId == 0) {
      this.adminUserRolePermissionService.add(this.vForm.value).subscribe(result => {
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
      this.adminUserRolePermissionService.update(this.autoId, this.vForm.getRawValue()).subscribe(result => {
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
