import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login, LoginResponse, UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiPath: string = environment.apiUrl;
  user = new BehaviorSubject<UserModel>({});
  public currentUser: Observable<UserModel>;
  clearTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.user.asObservable();
  }

  authUser(user: Login): Observable<LoginResponse> {
    return this.http.post<any>(this.apiPath + 'User/AdminLogin', user).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      // if (user.model != null) {
      //   this.refreshUser(user.model);
      // }
      // let date = new Date();
      // date.setDate(date.getDate() + 7);
      // this.autoLogout(date.getTime());
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user.model));
      //this.isSubUser = user.model?.parentUserId != null ? true : false;
      this.user.next(user.model);
      return user;
    }));
  }
  refreshUser(model: UserModel) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(model));
    this.user.next(model);
  }
  autoLogout(timeout: any) {
    console.log(timeout);
    this.clearTimer = setTimeout(() => {
      this.logout();
    }, timeout);
  }
  logout() {
    if (this.clearTimer)
      clearTimeout(this.clearTimer);
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.user.next({});
    this.router.navigateByUrl("/login");
  }

  public get currentUserValue(): UserModel {
    return this.user.value;
  }
  public set setcurrentUserValue(model: UserModel) {
    this.user.next(model);
  }
  gettoken() {
    return !!localStorage.getItem("currentUser");
  }
  getAuthtoken() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user?.token != null) {
      return user.token;
    }
  }

  public isLoggedIn(): boolean {
    let status = false;
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user?.token != null) {
      status = true;
    }
    return status;
  }
}