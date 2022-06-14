import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AppearanceInvoice/GetApperanceInvoices');
  }
  getInvoiceAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AppearanceInvoice/GetApperanceInvoicesList');
  }
  getInvoiceReceiptAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'AppearanceInvoice/GetApperanceInvoicesReceiptList');
  }
}
