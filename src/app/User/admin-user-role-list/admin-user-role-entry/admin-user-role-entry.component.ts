import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserRole } from 'src/app/models/admin-user-role';
import { AdminUserRoleService } from 'src/app/services/admin-user-role.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-admin-user-role-entry',
  templateUrl: './admin-user-role-entry.component.html',
  styleUrls: ['./admin-user-role-entry.component.css']
})
export class AdminUserRoleEntryComponent implements OnInit {

  @Input() adminUserRoleName: any;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private adminUserRoleService: AdminUserRoleService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    adminUserRoleName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    roleHierarchy: new FormControl('', [
      Validators.required]),
  });
  ngOnInit() {

    if (this.adminUserRoleName != '') {
      this.vForm.controls['adminUserRoleName'].disable({ onlySelf: true });

      this.adminUserRoleService.get(this.adminUserRoleName).subscribe((result) => {
        if (result.isSuccess) {
          let role: AdminUserRole = result.model;
          this.vForm.patchValue({
            adminUserRoleName: role.adminUserRoleName,
            roleHierarchy: role.roleHierarchy
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
    if (this.adminUserRoleName == '') {
      this.adminUserRoleService.add(this.vForm.value).subscribe(result =>
      //   (res) => {
      //   console.log(res);
      //   this.alertify.success('Data saved successfully.');
      //   location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   }
      {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          location.reload();
        } else {
          this.alertify.error(result.message);
        }
      });
    }
    else {
      this.adminUserRoleService.update(this.vForm.getRawValue()).subscribe(result =>
      //   (res) => {

      //   this.alertify.success('Data saved successfully.');
      //   window.location.reload();
      // },
      //   (error) => {
      //     console.log(error);
      //     this.alertify.error('Error saving data.');
      //   }
      {
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
