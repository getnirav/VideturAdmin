import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(paymentMethod: PaymentMethod): Observable<any> {
    return this.http.post<PaymentMethod>(this.apiPath + 'PaymentMethod/Add', paymentMethod);
  }
  update(autoId: number, paymentMethod: PaymentMethod): Observable<any> {
    return this.http.put<PaymentMethod>(this.apiPath + 'PaymentMethod/update/' + autoId, paymentMethod);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'PaymentMethod/' + autoId);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'PaymentMethod/');
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'PaymentMethod/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'PaymentMethod/deleteMultiple/', autoIds);
  }
}
