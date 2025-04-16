import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';
import { ApiResponseModelPaginated } from '../../api/models/response/responseModel/apiResponseModelPaginated';
import { ClientResponse } from '../../api/models/response/clientResponse';
import { ApiResponseModel } from '../../api/models/response/responseModel/apiResponseModel';
import { ClientRequest } from '../../api/models/request/clientRequest';

@Injectable({
  providedIn: 'root'
})
export class ClientApiServiceService {

  _httpClient = inject(HttpClient);
  _httpParam = inject(HttpParams);
  _modalService = inject(ModalServiceService);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl;          // contains the base Url of API. 
  private clientEndpoint = API_ENDPOINTS.clientApi; // contains all the client's API's

    

  getAllClients(size?: number, urlPage?:string): Observable<ApiResponseModelPaginated<ClientResponse>>{
    const params = new HttpParams()
    .set('pageNumber' , pageNumber)
    .set('pageSize' , pageSize) 
    .set('sortBy' , sortBy)
    .set('direction' , direction)
    const url = urlPage ? urlPage : `${this.apiBaseUrl+this.clientEndpoint.getAllClients}?pageNumber=0&pageSize=${size??10}` ;
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url);
  }

  getClientById(id:number):Observable<ApiResponseModel<ClientResponse>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.getClientById(id)}`;
    return this._httpClient.get<ApiResponseModel<ClientResponse>>(url);
  }


  updateClients(id:number, clientInfo:ClientRequest):Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.updateClientById}/${id}`;
    return this._httpClient.put<ApiResponseModel<string>>(url, clientInfo);
  }


  saveClient(client: ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.saveNewClient}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, client);
  }



  searchQuery(query: string, pageNumber: number,
              pageSize: number, sortBy: string,
              direction: string ):Observable<ApiResponseModelPaginated<ClientResponse>>{
    /*setting parameters of the Http-Request. (httpParam is immutable so i need to set in the same instance that is declared.
                rather than doing param.set(....) we directly use the first instance of the httpParam.
    */
    const params = new HttpParams()
      .set('pageNumber' , pageNumber)
      .set('pageSize' , pageSize)
      .set('sortBy' , sortBy)
      .set('direction' , direction)
    const url = `${this.apiBaseUrl}${this.clientEndpoint.searchClients}`;
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url,{ params });
  }





  
}//ends class
