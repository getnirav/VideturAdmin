import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  userSubmitted: boolean = false;
  @Input() src: any;
  returnUrl: any;
  constructor(
    // public activeModal: NgbActiveModal,
    // public modalService: NgbModal,
    private route: ActivatedRoute,
    // private spinner: NgxSpinnerService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      loginId: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onLogin() {
    // this.spinner.show();
    this.userSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.authUser(this.loginForm.value).subscribe(result => {
        // this.spinner.hide();
        if (result.isSuccess) {

          this.router.navigate(['/']);

          this.alertify.success('Login Successfully');
          // this.modalService.dismissAll();
        }
        else if (!result.isSuccess) {
          this.alertify.error(result.message);
        }
      });

    }
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get loginId() {
    return this.loginForm.get('loginId') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  // -----------------------


  // openForgotPasswordPopup(link: any) {
  //   //const modalRef = this.modalService.open(UserLoginComponent,{size:'sm', backdrop: 'static' });
  //   const modalRef = this.modalService.open(ForgotPasswordComponent);
  //   modalRef.componentInstance.src = link;
  // }

}

