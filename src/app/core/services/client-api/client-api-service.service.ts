import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { apiResponseClient } from '../../models/apiResponseClient';

@Injectable({
  providedIn: 'root'
})
export class ClientApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;          // contains the base Url of API. 
  private clientEndpoint = environment.clientEndpoint; // contains all the client's API's

  //page info in parameter.
  getAllClients(page: number, size: number): Observable<apiResponseClient>{
    const url = `${this.apiBaseUrl+this.clientEndpoint.getAllClients}?page=${page}&size=${size}` 
    return this._httpClient.get<apiResponseClient>(url);
  }








  
}//ends class
