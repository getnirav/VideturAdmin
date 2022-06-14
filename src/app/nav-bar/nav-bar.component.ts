import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserModel } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ChangePasswordComponent } from '../User/login/change-password/change-password.component';
import { UserProfileComponent } from '../User/user-profile/user-profile.component';
// import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    public modalService: NgbModal) { }

  ngOnInit() {
    //Toggle Click Function
    // $("#menu-toggle").click(function(e:any) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    //   });
    this.userSub = this.authService.user.subscribe(user => {
      if (!this.isEmptyObject(user)) {
        this.userModel = user;
      }
      else {
        this.userModel = {};
        // this.router.navigate(['login']);
      }
    })
  }
  onSignOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  userSub: Subscription | undefined;
  userModel!: UserModel;
  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }


  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }
  openAddPopup(link: any) {
    if (link == 'CP') {
      const modalRef = this.modalService.open(ChangePasswordComponent);
      modalRef.componentInstance.userModel = this.userModel;
    }
    else if (link == 'UP') {
      const modalRef = this.modalService.open(UserProfileComponent);
      modalRef.componentInstance.userModel = this.userModel;
    }
  }
}