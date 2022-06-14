import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OtherMaster } from '../models/other-master';

@Injectable({
  providedIn: 'root'
})
export class OtherMasterService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(otherMaster: OtherMaster): Observable<any> {
    return this.http.post<OtherMaster>(this.apiPath + 'OtherMaster/Add', otherMaster);
  }
  update(autoId: number, otherMaster: OtherMaster): Observable<any> {
    return this.http.put<OtherMaster>(this.apiPath + 'OtherMaster/update/' + autoId, otherMaster);
  }
  get(OtherMasterId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'OtherMaster/' + OtherMasterId);
  }
  getTypeAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'OtherMaster/GetByType');
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'OtherMaster/');
  }
  getByRecordType(recordType: string): Observable<any> {
    return this.http.get<any>(this.apiPath + 'OtherMaster/GetByRecordType/' + recordType);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'OtherMaster/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'OtherMaster/deleteMultiple/', autoIds);
  }

}
