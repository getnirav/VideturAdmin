import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminUserRolePermission } from '../models/admin-user-role-permission';

@Injectable({
  providedIn: 'root'
})
export class AdminUserRolePermissionService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(adminUserRolePermission: AdminUserRolePermission): Observable<any> {
    return this.http.post<AdminUserRolePermission>(this.apiPath + 'AdminUserRolePermission/Add', adminUserRolePermission);
  }
  update(autoId: number, adminUserRolePermission: AdminUserRolePermission): Observable<any> {
    return this.http.put<AdminUserRolePermission>(this.apiPath + 'AdminUserRolePermission/update/' + autoId, adminUserRolePermission);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'AdminUserRolePermission/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'AdminUserRolePermission/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AdminUserRolePermission/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AdminUserRolePermission/');
  }
}
