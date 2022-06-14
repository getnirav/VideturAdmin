import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanPricing } from '../models/plan-pricing';

@Injectable({
  providedIn: 'root'
})
export class PlanPricingService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(planPricing: PlanPricing): Observable<any> {
    return this.http.post<PlanPricing>(this.apiPath + 'PlanPricing/Add', planPricing);
  }
  update(autoId: number, planPricing: PlanPricing): Observable<any> {
    return this.http.put<PlanPricing>(this.apiPath + 'PlanPricing/update/' + autoId, planPricing);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'PlanPricing/' + autoId);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'PlanPricing/');
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'PlanPricing/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'PlanPricing/deleteMultiple/', autoIds);
  }
}
