import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';
import { ApiResponseModel } from '../../api/models/response/responseModel/apiResponseModel';
import { UserAuthRequest } from '../../api/models/request/userAuthRequest';
import { UserRegisterRequest } from '../../api/models/request/userRegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class PublicApiServiceService {

  private _httpClient : HttpClient = inject(HttpClient);//injecting HttpClient.
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl; //this is the base url
  private publicApi = API_ENDPOINTS.publicApi; //this contains the login and signup API's.
 
 // Login Method: 
  userLogin( userObj: UserAuthRequest):Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.publicApi.login}`;
    return this._httpClient.post<ApiResponseModel<string>>( url, userObj);
  }
 
  // Registration Method: 
 userRegister(userObj: UserRegisterRequest):Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.publicApi.signup}`;
    return this._httpClient.post<ApiResponseModel<string>>( url, userObj);
 }
 
 // Token-Validation Method:
 validateToken(token: string) : Observable<ApiResponseModel<string>>{
  const url = this.apiBaseUrl+this.publicApi.validateToken;
  return this._httpClient.post<ApiResponseModel<string>>(url, token);
 }



}//ends class.
