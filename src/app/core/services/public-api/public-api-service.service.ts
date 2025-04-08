import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuth } from '../../models/userAuth';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';
import { I_ApiResponseModel } from '../../api/models/interface/responses/apiResponseModel';
import { TokenValidateRequest } from '../../api/models/interface/requests/tokenValidateRequest';

@Injectable({
  providedIn: 'root'
})
export class PublicApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);//injecting HttpClient.
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl; //this is the base url
  private publicApi = API_ENDPOINTS.publicApi; //this contains the login and signup API's.
 
 //This method is to validate/login the user.
  userLogin( userObj:{email:string, password:string} ):Observable<any>{
    return this._httpClient.post<UserAuth>(this.apiBaseUrl+this.publicApi.login, userObj);
  }
 
  //This method is to register user
 userRegister(userObj:{email:string, password:string}):Observable<any>{
    return this._httpClient.post(this.apiBaseUrl+this.publicApi.signup, userObj);
 }
 
 validateToken(tokenRequest: TokenValidateRequest) : Observable<I_ApiResponseModel<string>>{
  const url = this.apiBaseUrl+this.publicApi.validateToken;
  return this._httpClient.post<I_ApiResponseModel<string>>(url, tokenRequest);
 }


 
  /* constructor() { } */



}//ends class.
