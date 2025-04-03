import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponseClient, ApiResponseSingleClient } from '../../models/apiResponseClient';
import { ClientDto } from '../../models/clientDto';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { ApiResponse } from '../../models/apiResponse';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';

@Injectable({
  providedIn: 'root'
})
export class ClientApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);
  _modalService = inject(ModalServiceService);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl;          // contains the base Url of API. 
  private clientEndpoint = API_ENDPOINTS.clientApi; // contains all the client's API's

  private clientObj : ClientDto;


  //page info in parameter.
 /*  getAllClients(page?: number, size?: number, urlPage?:string): Observable<ApiResponseClient>{
    const url = urlPage ? urlPage : `${this.apiBaseUrl+this.clientEndpoint.getAllClients}?page=${page??0}&size=${size??10}` ;
    return this._httpClient.get<ApiResponseClient>(url);
  } */


    

  getAllClients(size?: number, urlPage?:string): Observable<ApiResponseClient>{
    const url = urlPage ? urlPage : `${this.apiBaseUrl+this.clientEndpoint.getAllClients}?pageNumber=0&pageSize=${size??10}` ;
    return this._httpClient.get<ApiResponseClient>(url);
  }

  getClientById(id:number):Observable<ApiResponseSingleClient>{
    return this._httpClient.get<ApiResponseSingleClient>(`${this.apiBaseUrl+this.clientEndpoint.getClientById}/${id}`);
  }


  updateClients(id:number, clientInfo:ClientDto):Observable<ApiResponse>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.updateClientById}/${id}`;
    return this._httpClient.put<ApiResponse>(url, clientInfo);
  }

  searchQuery(query:string):Observable<ApiResponseClient>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.searchClients}/${query}`;
    return this._httpClient.get<ApiResponseClient>(url);
  }





  
}//ends class
