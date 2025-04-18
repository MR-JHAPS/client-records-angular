import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable, throwError } from 'rxjs';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';
import { ApiResponseModelPaginated } from '../../api/models/response/responseModel/apiResponseModelPaginated';
import { ClientResponse } from '../../api/models/response/clientResponse';
import { ApiResponseModel } from '../../api/models/response/responseModel/apiResponseModel';
import { ClientRequest } from '../../api/models/request/clientRequest';
import { PaginationParams } from '../../api/models/request/paginationParams';
import { ApiLinksDetails } from '../../api/models/response/responseModel/apiLinksDetails';

type clientSearchCriteria = {
  type: 'searchQuery' | 'firstName' | 'lastName' | 'postalCode';
  value: string;
  pagination?:{
    pageNumber?:number;
    pageSize?: number;
  };
  sorting?: {
    sortBy?: string;
    direction?: string;
  };

};


@Injectable({
  providedIn: 'root'
})
export class ClientApiServiceService {

  _httpClient = inject(HttpClient);

  _modalService = inject(ModalServiceService);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl;          // contains the base Url of API. 
  private clientEndpoint = API_ENDPOINTS.clientApi; // contains all the client's API's


  
  //Base GetAllClients:
  getAllClients(pageNumber?: number, pageSize?: number, sortBy?:string, direction?: string) : Observable<ApiResponseModelPaginated<ClientResponse>>{
      const url = `${this.apiBaseUrl+this.clientEndpoint.getAllClients}`;
      let size = pageSize ? pageSize : 10;
      let number = pageNumber ? pageNumber : 0;
      let sortingBy = sortBy ? sortBy : "";
      let sortDirection = direction ? direction : "";
      const params = new HttpParams()
        .set("page" , number)
        .set("size", size)
        .set("sortBy", sortingBy)
        .set("direction", sortDirection)
      return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url, { params });  
  }

  //GENERIC TRIAL:
   // In this method we can directly pass the APiModelPaginated and get the next, prev, current page from links.
   getRequiredPage(pageLinks : Array<ApiLinksDetails>, action: string): Observable<ApiResponseModelPaginated<ClientResponse>>{
    //we need to get the url from the pageLinks. we want to take out the href(url) of rel(next).
   if(!pageLinks || pageLinks.length ===0){
    return throwError(() => new Error('No pagination links provided'));
   }
    const actionPageLink = pageLinks.find(link => link.rel === action); // finding the rel with name "next".
    if(!actionPageLink?.href){
      return throwError(()=> new Error(`${action} page link not found or invalid`))
    }
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(actionPageLink.href);
  }




  // In this method we can directly pass the APiModelPaginated and get the next, prev, current page from links.
  getNextPage(pageLinks : Array<ApiLinksDetails>): Observable<ApiResponseModelPaginated<ClientResponse>>{
    //we need to get the url from the pageLinks. we want to take out the href(url) of rel(next).
   if(!pageLinks || pageLinks.length ===0){
    return throwError(() => new Error('No pagination links provided'));
   }
    const nextPageLink = pageLinks.find(link => link.rel === "next"); // finding the rel with name "next".
    if(!nextPageLink?.href){
      return throwError(()=> new Error('Next page link not found or invalid'))
    }
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(nextPageLink.href);
  }


  getCurrentPage(pageLinks : Array<ApiLinksDetails>): Observable<ApiResponseModelPaginated<ClientResponse>>{
    //we need to get the url from the pageLinks. we want to take out the href(url) of rel(current).
   if(!pageLinks || pageLinks.length ===0){
    return throwError(() => new Error('No pagination links provided'));
   }
    const nextPageLink = pageLinks.find(link => link.rel === "self"); // finding the rel with name "current".
    if(!nextPageLink?.href){
      return throwError(()=> new Error('Next page link not found or invalid'))
    }
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(nextPageLink.href);
  }


  getPreviousPage(pageLinks : Array<ApiLinksDetails>) : Observable<ApiResponseModelPaginated<ClientResponse>>{

    if(!pageLinks || pageLinks.length ===0){
      return throwError(() => new Error('No pagination links provided'));
     }
      const nextPageLink = pageLinks.find(link => link.rel === "prev"); // finding the rel with name "prev".
      if(!nextPageLink?.href){
        return throwError(()=> new Error('Next page link not found or invalid'))
      }
      return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(nextPageLink.href);
    }
  

  getFirstPage(pageLinks : Array<ApiLinksDetails>) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    if(!pageLinks || pageLinks.length ===0){
      return throwError(() => new Error('No pagination links provided'));
     }
      const nextPageLink = pageLinks.find(link => link.rel === "first"); // finding the rel with name "first".
      if(!nextPageLink?.href){
        return throwError(()=> new Error('Next page link not found or invalid'))
      }
      return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(nextPageLink.href);
  }
  
  

  getLastPage(pageLinks : Array<ApiLinksDetails>) : Observable<ApiResponseModelPaginated<ClientResponse>>{
    if(!pageLinks || pageLinks.length ===0){
      return throwError(() => new Error('No pagination links provided'));
     }
      const nextPageLink = pageLinks.find(link => link.rel === "last"); // finding the rel with name "last".
      if(!nextPageLink?.href){
        return throwError(()=> new Error('Next page link not found or invalid'))
      }
      return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(nextPageLink.href);
  }
  
  





    
/*   // Method: Get All Clients.
  getAllClients(params : PaginationParams): Observable<ApiResponseModelPaginated<ClientResponse>>{
    const params = new HttpParams()
    .set('pageNumber' , pageNumber? pageNumber : 0)
    .set('pageSize' , pageSize? pageSize : 10) 
    .set('sortBy' , sortBy ? sortBy : "")
    .set('direction' , direction ? direction: "")
    const url = urlPage ? urlPage : `${this.apiBaseUrl+this.clientEndpoint.getAllClients}` ;
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url);
  } */

  // Method: Get Client By ID.
  getClientById(id:number):Observable<ApiResponseModel<ClientResponse>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.getClientById(id)}`;
    return this._httpClient.get<ApiResponseModel<ClientResponse>>(url);
  }


  // Method: UpdateClient.
  updateClients(id:number, clientInfo:ClientRequest):Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.updateClientById}/${id}`;
    return this._httpClient.put<ApiResponseModel<string>>(url, clientInfo);
  }

  // Method: Save Client.
  saveClient(client: ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.saveNewClient}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, client);
  }


  // Method: Search Clients
  searchQuery(criteria: clientSearchCriteria) : Observable<ApiResponseModelPaginated<ClientResponse>> {
    /*setting parameters of the Http-Request. (httpParam is immutable so i need to set in the same instance that is declared.
                rather than doing param.set(....) we directly use the first instance of the httpParam.
    */
    let params = new HttpParams()
    .set('pageNumber', criteria.pagination?.pageNumber?.toString()??'0') 
    .set('pageSize', criteria.pagination?.pageSize?.toString()??'10');

    //setting the selected search parameter.(radio button confirms only one is selected).
    params = params.set(criteria.type, criteria.value);
    
    if(criteria.sorting?.sortBy){
      params = params.set('sortBy', criteria.sorting.sortBy);
    }
    if(criteria.sorting?.direction){
      params = params.set('direction', criteria.sorting.direction);
    }
    const url = `${this.apiBaseUrl}${this.clientEndpoint.searchClients}`;
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url,{ params });
  }





  
}//ends class
