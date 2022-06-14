import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(city: City): Observable<any> {
    return this.http.post<City>(this.apiPath + 'City/Add', city);
  }
  update(autoId: number, city: City): Observable<any> {
    return this.http.put<City>(this.apiPath + 'city/update/' + autoId, city);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'city/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'city/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'City/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'City/');
  }
  getByCounty(CountyMasterId: number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'City/GetByCounty/' + CountyMasterId);
  }
}
