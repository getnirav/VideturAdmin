import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppearanceType } from '../models/appearance-type';

@Injectable({
  providedIn: 'root'
})
export class AppearanceTypeService {


  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(appearanceType: AppearanceType): Observable<any> {
    return this.http.post<AppearanceType>(this.apiPath + 'AppearanceType/Add', appearanceType);
  }
  update(autoId: number, appearanceType: AppearanceType): Observable<any> {
    return this.http.put<AppearanceType>(this.apiPath + 'AppearanceType/update/' + autoId, appearanceType);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'AppearanceType/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'AppearanceType/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AppearanceType/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AppearanceType/GetAllNew');
  }
}
