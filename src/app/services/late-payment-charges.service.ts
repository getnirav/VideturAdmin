import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LatePaymentCharges } from '../models/late-payment-charges';

@Injectable({
  providedIn: 'root'
})
export class LatePaymentChargesService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(latePaymentCharges: LatePaymentCharges): Observable<any> {
    return this.http.post<LatePaymentCharges>(this.apiPath + 'LatePaymentCharges/Add', latePaymentCharges);
  }
  update(autoId: number, latePaymentCharges: LatePaymentCharges): Observable<any> {
    return this.http.put<LatePaymentCharges>(this.apiPath + 'LatePaymentCharges/update/' + autoId, latePaymentCharges);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'LatePaymentCharges/' + autoId);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'LatePaymentCharges/');
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'LatePaymentCharges/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'LatePaymentCharges/deleteMultiple/', autoIds);
  }
}
