import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel, UserProfile } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  userModel!: UserModel;
  submitted = false;


  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal, private userService: UserService,
    private alertify: AlertifyService, private authService: AuthService) { }

  vForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)])
  });
  ngOnInit() {


    if (this.userModel.id) {
      this.userService.getUserInfo(this.userModel.id).subscribe(result => {
        if (result.isSuccess) {
          let userProfile: UserProfile = result.model;
          this.vForm.patchValue({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName
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
    if (this.userModel.id) {
      this.userService.update(this.userModel.id, this.vForm.getRawValue()).subscribe(result => {
        if (result.isSuccess) {
          this.userModel.firstName = this.vForm.get('firstName')?.value;
          this.userModel.lastName = this.vForm.get('lastName')?.value;
          this.authService.refreshUser(this.userModel);
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
