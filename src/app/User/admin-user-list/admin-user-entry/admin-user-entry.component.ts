import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserRole } from 'src/app/models/admin-user-role';
import { AdminUserRoleService } from 'src/app/services/admin-user-role.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-entry',
  templateUrl: './admin-user-entry.component.html',
  styleUrls: ['./admin-user-entry.component.css']
})
export class AdminUserEntryComponent implements OnInit {


  @Input() autoId: number = 0;

  submitted = false;
  adminUserRoles: AdminUserRole[] = [];

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private userService: UserService,
    private alertify: AlertifyService, private adminUserRoleService: AdminUserRoleService) {


  }

  vForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    adminUserRoleName: new FormControl('', [
      Validators.required]),
    loginId: new FormControl('', [
      Validators.required,
      Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    confirmNewPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6), this.passwordMatcher.bind(this)])
  });
  // confirm new password validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.vForm &&
      (control.value !== this.vForm.controls.newPassword.value)
    ) {
      return { passwordNotMatch: true };
    }
    return {};
  }
  ngOnInit() {
    this.adminUserRoleService.getAll().subscribe(result => {
      if (result.isSuccess) {
        this.adminUserRoles = result.list;
      }
    });
    if (this.autoId != 0) {
      this.userService.getAdminUserbyId(this.autoId).subscribe(result => {
        if (result.isSuccess) {
          this.vForm.patchValue({
            firstName: result.model.firstName,
            lastName: result.model.lastName,
            adminUserRoleName: result.model.adminUserRoleName,
          });
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
  }
  onFocusOutEvent(event: any) {
    this.vForm.controls.confirmPassword.setValue('');
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.autoId == 0) {
      if (this.vForm.invalid) {
        return;
      }
      this.userService.addAdminUser(this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    else {
      this.userService.updateAdminUser(this.autoId, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
    this.activeModal.close();
  }
}
