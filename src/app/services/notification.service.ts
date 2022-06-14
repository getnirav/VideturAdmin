import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';
// import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(notification: Notification): Observable<any> {
    console.log(notification);
    return this.http.post<Notification>(this.apiPath + 'EmailAppNotification/Add', notification);
  }
  update(autoId: number, notification: Notification): Observable<any> {
    console.log(notification);
    return this.http.put<Notification>(this.apiPath + 'EmailAppNotification/update/' + autoId, notification);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'EmailAppNotification/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'EmailAppNotification/deleteMultiple/', autoIds);
  }
  get(notificationId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'EmailAppNotification/' + notificationId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'EmailAppNotification/');
  }
}
