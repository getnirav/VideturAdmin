import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleAction } from '../models/module-action';

@Injectable({
  providedIn: 'root'
})
export class ModuleActionService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(moduleaction: ModuleAction): Observable<any> {
    return this.http.post<ModuleAction>(this.apiPath + 'ModuleAction/Add', moduleaction);
  }
  update(autoId: number, moduleaction: ModuleAction): Observable<any> {
    return this.http.put<ModuleAction>(this.apiPath + 'ModuleAction/update/' + autoId, moduleaction);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'ModuleAction/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'ModuleAction/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'ModuleAction/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'ModuleAction/');
  }
  GetByModule(ModuleMasterId: number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'ModuleAction/GetByModule/' + ModuleMasterId);
  }
}
