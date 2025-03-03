import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponseClient } from '../../models/apiResponseClient';
import { ClientDto } from '../../models/clientDto';

@Injectable({
  providedIn: 'root'
})
export class ClientApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;          // contains the base Url of API. 
  private clientEndpoint = environment.clientEndpoint; // contains all the client's API's

  private clientObj : ClientDto;


  //page info in parameter.
 /*  getAllClients(page?: number, size?: number, urlPage?:string): Observable<ApiResponseClient>{
    const url = urlPage ? urlPage : `${this.apiBaseUrl+this.clientEndpoint.getAllClients}?page=${page??0}&size=${size??10}` ;
    return this._httpClient.get<ApiResponseClient>(url);
  } */

    getAllClients(size?: number, urlPage?:string): Observable<ApiResponseClient>{
      const url = urlPage ? urlPage : `${this.apiBaseUrl+this.clientEndpoint.getAllClients}?page=0&size=${size??10}` ;
      return this._httpClient.get<ApiResponseClient>(url);
    }


  updateClients(id:number){
    const url = `${this.apiBaseUrl}+${this.clientEndpoint.updateClient}/${id}`;
    return this._httpClient.put(url, this.clientObj);
  }

  searchQuery(query:string):Observable<ApiResponseClient>{
    const url = `${this.apiBaseUrl}${this.clientEndpoint.getClientsBySearchQuery}/${query}`;
    return this._httpClient.get<ApiResponseClient>(url);
  }





  
}//ends class
