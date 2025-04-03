import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl; //this is the base url
  private userEndpoints = API_ENDPOINTS.userApi; //this contains the api of users
 
  


 /*  userLogin(credentials:{email:string, password:string}):Observable<any>{
    return this._httpClient.post<UserAuth>(this.apiBaseUrl+this.publicEndpoints.login, credentials);
  } */



  constructor() { }
}
