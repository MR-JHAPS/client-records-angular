import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';
import { ClientLogResponse } from '../../models/response/clientLogResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientLogService {

  _httpClient = inject(HttpClient);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl;          // contains the base Url of API. 
  private clientLogEndpoint = API_ENDPOINTS.clientLogApi; // contains all the client's API's


  getAllClientLog(pageNumber?: number, pageSize?: number, sortByField?:string, sortDirection?: string) : Observable<ApiResponseModelPaginated<ClientLogResponse>>{
      const url = `${this.apiBaseUrl+this.clientLogEndpoint.getAllClientLog}`;
      let size = pageSize? pageSize : "10";
      let page = pageNumber? pageNumber : "0";
      let sortBy = sortByField? sortByField : "updatedAt";
      let direction = sortDirection? sortDirection : "desc"; 
      let  params = new HttpParams()
                      .set("size", size)   
                      .set("page", page)
                      .set("sortBy", sortBy)
                      .set("direction", direction);
                      
        return this._httpClient.get<ApiResponseModelPaginated<ClientLogResponse>>(url, {params});
  }









}//ends class
