import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleMaster } from '../models/module-master';

@Injectable({
  providedIn: 'root'
})
export class ModuleMasterService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(moduleMaster: ModuleMaster): Observable<any> {
    return this.http.post<ModuleMaster>(this.apiPath + 'ModuleMaster/Add', moduleMaster);
  }
  update(autoId: number, moduleMaster: ModuleMaster): Observable<any> {
    return this.http.put<ModuleMaster>(this.apiPath + 'ModuleMaster/update/' + autoId, moduleMaster);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'ModuleMaster/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'ModuleMaster/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'ModuleMaster/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'ModuleMaster/');
  }
}
