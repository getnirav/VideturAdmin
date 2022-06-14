import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminUserRole } from '../models/admin-user-role';

@Injectable({
  providedIn: 'root'
})
export class AdminUserRoleService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(role: AdminUserRole): Observable<any> {
    return this.http.post<AdminUserRole>(this.apiPath + 'AdminUserRole/Add', role);
  }
  update(role: AdminUserRole): Observable<any> {
    return this.http.put<AdminUserRole>(this.apiPath + 'AdminUserRole/update/' + role.adminUserRoleName, role);
  }
  delete(role: string): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'AdminUserRole/Delete/' + role, '');
  }

  get(role: string): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AdminUserRole/GetByCode/' + role);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AdminUserRole/');
  }
}
