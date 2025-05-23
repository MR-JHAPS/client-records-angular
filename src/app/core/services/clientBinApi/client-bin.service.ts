import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';
import { clientBinResponse } from '../../models/response/clientBinResponse';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ClientBinService {

  _httpClient = inject(HttpClient);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl;
  private clientBinEndpoints = API_ENDPOINTS.clientBinApi;



  getAllClientBin(pageNumber?: number, pageSize?: number, sortBy?:string, direction?:string ) : Observable<ApiResponseModelPaginated<clientBinResponse>>{

    let params = new HttpParams()
              .set("page", pageNumber? pageNumber : 0)
              .set("size", pageSize? pageSize : 10)
              .set("sortBy", sortBy? sortBy: "")
              .set("direction", direction? direction : "");
    const url = `${this.apiBaseUrl+this.clientBinEndpoints.getAllClientBin}`;
    return this._httpClient.get<ApiResponseModelPaginated<clientBinResponse>>(url, {params});
  }


  restoreFromClientBin(id : number): Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.clientBinEndpoints.restoreFromClientBin(id)}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, id);
  }


  deleteFromClientBin(id: number): Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.clientBinEndpoints.deleteFromClientBin(id)}`;
    return this._httpClient.delete<ApiResponseModel<string>>(url);
  }



}
