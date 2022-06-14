import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CaseTypePracticeArea } from '../models/case-type-practice-area';

@Injectable({
  providedIn: 'root'
})
export class CaseTypePracticeAreaService {


  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(caseTypePracticeArea: CaseTypePracticeArea): Observable<any> {
    return this.http.post<CaseTypePracticeArea>(this.apiPath + 'CaseTypePracticeArea/Add', caseTypePracticeArea);
  }
  update(autoId: number, caseTypePracticeArea: CaseTypePracticeArea): Observable<any> {
    return this.http.put<CaseTypePracticeArea>(this.apiPath + 'CaseTypePracticeArea/update/' + autoId, caseTypePracticeArea);
  }
  delete(autoId: number): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'CaseTypePracticeArea/Delete/' + autoId, '');
  }
  deleteMultiple(autoIds: number[]): Observable<any> {
    return this.http.patch<any>(this.apiPath + 'CaseTypePracticeArea/deleteMultiple/', autoIds);
  }
  get(autoId: Number): Observable<any> {
    return this.http.get<any>(this.apiPath + 'CaseTypePracticeArea/GetByIdNew/' + autoId);
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiPath + 'CaseTypePracticeArea/GetAllNew');
  }
  // getByCounty(CountyMasterId: number): Observable<any> {
  //   return this.http.get<any>(this.apiPath + 'CaseTypePracticeArea/GetByCounty/' + CountyMasterId);
  // }
}
