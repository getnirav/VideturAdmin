import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { County } from '../models/county';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(county: County): Observable<any> {
    return this.http.post<County>(this.apiPath + 'County/Add', county);
  }

  update(autoId: number, county: County): Observable<any> {
    console.log(county);
    return this.http.put<any>(this.apiPath + 'County/Update/' + autoId, county);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'County/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'County/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'County/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'County/');
  }
  getByState(StateMasterId: number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'County/GetByState/' + StateMasterId);
  }
}
