import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { ClientResponse } from '../../models/response/clientResponse';
import { ClientRequest } from '../../models/request/clientRequest';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';
import { ApiLinksDetails } from '../../models/responseModel/apiLinksDetails';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { BulkClientDeleteRequest } from '../../models/request/bulkClientDeleteRequest';
import { SearchRequest } from '../../models/request/searchRequest';

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


  // Method: Get Client By ID.
  getClientById(id:number):Observable<ApiResponseModel<ClientResponse>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.getClientById(id)}`;
    return this._httpClient.get<ApiResponseModel<ClientResponse>>(url);
  }


   // Method: Save Client.
   saveClient(client: ClientRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.saveNewClient}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, client);
  }

  // Method: UpdateClient.
  updateClients(id:number, clientInfo:ClientRequest):Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.updateClientById(id)}`;
    return this._httpClient.put<ApiResponseModel<string>>(url, clientInfo);
  }

 //Method: DeleteClient (SINGLE).
 deleteClient(clientId : number) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.deleteClientById(clientId)}`;
    return this._httpClient.delete<ApiResponseModel<string>>(url);
 }
 
 //Method: DeleteClients (MULTIPLE).
 deleteMultipleClients(clientIdList : BulkClientDeleteRequest) : Observable<ApiResponseModel<string>>{
  const url = `${this.apiBaseUrl}${this.clientEndpoint.deleteMultipleClientsByIdList}`;
  return this._httpClient.delete<ApiResponseModel<string>>(url, {body : clientIdList});
}


  // // Method: Search Clients
  // searchQuery(criteria: clientSearchCriteria) : Observable<ApiResponseModelPaginated<ClientResponse>> {
  //   /*setting parameters of the Http-Request. (httpParam is immutable so i need to set in the same instance that is declared.
  //               rather than doing param.set(....) we directly use the first instance of the httpParam.
  //   */
  //   let params = new HttpParams()
  //   .set('pageNumber', criteria.pagination?.pageNumber?.toString()??'0') 
  //   .set('pageSize', criteria.pagination?.pageSize?.toString()??'10');

  //   //setting the selected search parameter.(radio button confirms only one is selected).
  //   params = params.set(criteria.type, criteria.value);
    
  //   if(criteria.sorting?.sortBy){
  //     params = params.set('sortBy', criteria.sorting.sortBy);
  //   }
  //   if(criteria.sorting?.direction){
  //     params = params.set('direction', criteria.sorting.direction);
  //   }
  //   const url = `${this.apiBaseUrl}${this.clientEndpoint.searchClients}`;
  //   return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url,{ params });
  // }




 // Method: Search Clients
 searchQuery(searchRequest: SearchRequest, pageNumber?: number, pageSize?: number, sortBy?:string, direction?: string) : Observable<ApiResponseModelPaginated<ClientResponse>> {
  /*setting parameters of the Http-Request. (httpParam is immutable so i need to set in the same instance that is declared.
              rather than doing param.set(....) we directly use the first instance of the httpParam.
  */
  let params = new HttpParams()
  .set('page', pageNumber?.toString()??'0') 
  .set('size', pageSize?.toString()??'10');

  //setting the selected search parameter.(radio button confirms only one is selected).
  params = params.set(searchRequest.searchBy, searchRequest.searchQuery);
  
  if(sortBy){
    params = params.set('sortBy', sortBy);
  }
  if(direction){
    params = params.set('direction', direction);
  }
  const url = `${this.apiBaseUrl}${this.clientEndpoint.searchClients}`;
  return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(url,{ params });
}


  




/*----------------------------------------PAGINATION ----------------------------------------------------------*/

//GENERIC TRIAL: Works fine @param is passed in pagination in html .
   // In this method we can directly pass the APiModelPaginated and get the next, prev, current page from links.
  //  getRequiredPage(pageLinks? : Array<ApiLinksDetails>, rel?: string, pageHref?: string): Observable<ApiResponseModelPaginated<ClientResponse>>{
  //   //we need to get the url from the pageLinks. we want to take out the href(url) of rel(next).
  //  if(!pageLinks || pageLinks.length ===0){
  //   return throwError(() => new Error('No pagination links provided'));
  //  }
  //  /* If the  */
  //  if(pageLinks){
  //   const actionPageLink = pageLinks.find(link => link.rel === rel); // finding the rel with name "next/prev/self/first/last".
  //   if(!actionPageLink?.href){
  //     return throwError(()=> new Error(`${rel} page link not found or invalid`))
  //   }
  //   return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(actionPageLink.href);
  //  }
  //  /* if the url is provided directly */
  //  if(pageHref){
  //       return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(pageHref);
  //   }
    
    
   
  // }


  getRequiredPage(pageHref: string): Observable<ApiResponseModelPaginated<ClientResponse>>{
   /* if the url is provided directly */
   /* if(!pageHref){
       return throwError(()=> new Error("Error Unable to find the pageHref: url"))
    } */
    return this._httpClient.get<ApiResponseModelPaginated<ClientResponse>>(pageHref);
  }



  
}//ends class
