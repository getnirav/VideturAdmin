import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(state: State): Observable<any> {
    return this.http.post<State>(this.apiPath + 'State/Add', state);
  }
  update(autoId: number, state: State): Observable<any> {
    return this.http.put<State>(this.apiPath + 'State/update/' + autoId, state);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'State/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'State/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'State/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'State/');
  }
  getByCountryCode(CountryCode: string): Observable<any> {
    return this.http.get<any>(this.apiPath + 'State/GetByCountry/' + CountryCode);
  }
}
