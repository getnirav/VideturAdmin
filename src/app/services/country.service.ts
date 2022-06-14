import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(country: Country): Observable<any> {
    return this.http.post<Country>(this.apiPath + 'Country/Add', country);
  }
  update(country: Country): Observable<any> {
    return this.http.put<Country>(this.apiPath + 'Country/update/' + country.countryCode, country);
  }
  delete(countryCode: string): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'Country/Delete/' + countryCode, '');
  }
  deleteMultiple(autoIds: string[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'Country/deleteMultiple/', autoIds);
  }
  get(CountryCode: string): Observable<any> {
    return this.http.get<any>(this.apiPath + 'Country/GetByCode/' + CountryCode);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'Country/');
  }
}
