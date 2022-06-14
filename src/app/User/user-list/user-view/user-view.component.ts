import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {


  @Input() user: any;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private userService: UserService,
    private alertify: AlertifyService) { }

  vForm = new FormGroup({
    parentUser: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    loginId: new FormControl(''),
    addressType: new FormControl(''),
    address: new FormControl(''),
    profileType: new FormControl(''),
    userRoleName: new FormControl('')
  });
  ngOnInit() {
    if (this.user != null) {
      let user: User = this.user;
      this.vForm.patchValue({
        parentUser: user.parentUser,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        loginId: user.loginId,
        addressType: user.addressType,
        address: user.address,
        profileType: user.profileType,
        userRoleName: user.userRoleName
      });
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.vForm.controls; }

}
