import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportExportDataService {

  public apiPath: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getExport(autoIds: string, ModuleName: string, fileType: string) {
    let queryParams = new HttpParams().append("autoId", autoIds).append("ModuleName", ModuleName).append("FileType", fileType);
    return this.http.get<any>(this.apiPath + 'ImportExportData/Export/', { params: queryParams, responseType: 'arraybuffer' as 'json' });
  }
}
