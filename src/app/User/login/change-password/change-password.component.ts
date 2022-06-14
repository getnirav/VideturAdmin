import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userModel!: UserModel;

  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private userService: UserService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
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

  }
  onFocusOutEvent(event: any) {
    this.vForm.controls.confirmPassword.setValue('');
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }
  SaveData() {

    this.submitted = true;
    if (this.vForm.invalid) {
      return;
    }
    if (this.userModel.id) {
      this.userService.changePassword(this.userModel.id, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.alertify.success(result.message);
          this.activeModal.close();
        } else {
          this.alertify.error(result.message);
        }
      }
      );
    }
  }
}
