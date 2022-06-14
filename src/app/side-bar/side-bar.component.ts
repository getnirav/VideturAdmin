import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  userSub: Subscription | undefined;
  userModel!: UserModel;
  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  ngOnInit() {
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
  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
