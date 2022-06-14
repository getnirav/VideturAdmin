import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  // get(autoId: Number): Observable<any> {
  //   return this.http.get<any>(this.apiPath + 'UserGeneralProfile/GetUserManagement').pipe(
  //     map((item: any) => {
  //       item.list.forEach((element: any) => {
  //         if (!element.parentFirstName)
  //           element.parentFirstName = ''
  //         if (!element.parentMiddleName)
  //           element.parentMiddleName = ''
  //         if (!element.parentLastName)
  //           element.parentLastName = ''
  //         element.parentUser = element.parentFirstName ?? ''
  //           + ' ' + element.parentMiddleName ?? '' + ' ' + element.parentLastName ?? '';

  //         element.parentUser = element.address1 ?? ''
  //           + ' ' + element.address2 ?? '' + ' ' + element.stateName ?? ''
  //           + ' ' + element.countyName ?? '' + ' ' + element.cityName ?? ''
  //           + ' ' + element.zipCode ?? '';
  //         if (element.profileType === 'E')
  //           element.profileType = 'Employer';
  //         if (element.profileType === 'A')
  //           element.profileType = 'Attorney';
  //         if (element.profileType === 'EA')
  //           element.profileType = 'Employer and Attorney';
  //         if (element.profileType === 'I')
  //           element.profileType = 'Individual';
  //       });
  //       return item;
  //     })
  //   );
  // }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'UserGeneralProfile/GetUserManagement').pipe(
      map((item: any) => {
        item.list.forEach((element: any) => {
          if (!element.parentFirstName)
            element.parentFirstName = ''
          if (!element.parentMiddleName)
            element.parentMiddleName = ''
          if (!element.parentLastName)
            element.parentLastName = ''
          element.parentUser = element.parentFirstName ?? ''
            + ' ' + element.parentMiddleName ?? '' + ' ' + element.parentLastName ?? '';

          // element.address = element.address1 ?? ''
          //   + ' ' + element.address2 ?? '' + ' ' + element.stateName ?? ''
          //   + ' ' + element.countyName ?? '' + ' ' + element.cityName ?? ''
          //   + ' ' + element.zipCode ?? '';


          if (element.profileType === 'E')
            element.profileType = 'Employer';
          if (element.profileType === 'A')
            element.profileType = 'Attorney';
          if (element.profileType === 'EA')
            element.profileType = 'Employer and Attorney';
          if (element.profileType === 'I')
            element.profileType = 'Individual';
        });
        return item;
      }), filter((x) => {
        let list = x.list;
        list = list.filter((y: { adminUser: boolean; }) => y.adminUser === false);
        x.list = list;
        return x;
      })
    );
  }

  getUserInfo(autoId: number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'UserGeneralProfile/UserInfo/' + autoId);
  }
  getAdminUser(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'User/GetAdminUsers');
  }
  update(autoId: number, userProfile: UserProfile): Observable<any> {
    return this.http.put<UserProfile>(this.apiPath + 'UserGeneralProfile/UpdateUserInfo/' + autoId, userProfile);
  }
  changePassword(autoId: number, userProfile: UserProfile): Observable<any> {
    return this.http.put<UserProfile>(this.apiPath + 'User/ChangePasswordAdmin/' + autoId, userProfile);
  }
  addAdminUser(userProfile: any): Observable<any> {
    return this.http.post<UserProfile>(this.apiPath + 'User/AddAdminUser/', userProfile);
  }
  updateAdminUser(id: number, userProfile: any): Observable<any> {
    return this.http.post<UserProfile>(this.apiPath + 'User/updateAdminUser/' + id, userProfile);
  }
  getAdminUserbyId(id: number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'User/GetAdminUser/' + id);
  }

}
