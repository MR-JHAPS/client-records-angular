import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { UserAuthRequest } from '../../models/request/userAuthRequest';
import { UserRegisterRequest } from '../../models/request/userRegisterRequest';
import { TokenValidateRequest } from '../../models/request/tokenValidateRequest';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { LoginResponse } from '../../models/response/loginResponse';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root'
})
export class PublicApiServiceService {

  private _httpClient : HttpClient = inject(HttpClient);//injecting HttpClient.
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl; //this is the base url
  private publicApi = API_ENDPOINTS.publicApi; //this contains the login and signup API's.
 
 // Login Method: 
  userLogin( userObj: UserAuthRequest):Observable<ApiResponseModel<LoginResponse>>{
    const url = `${this.apiBaseUrl+this.publicApi.login}`;
    return this._httpClient.post<ApiResponseModel<LoginResponse>>( url, userObj);
  }
 
  // Registration Method: 
 userRegister(userObj: UserRegisterRequest):Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.publicApi.signup}`;
    return this._httpClient.post<ApiResponseModel<string>>( url, userObj);
 }
 
 // Token-Validation Method:
 validateToken(token: TokenValidateRequest) : Observable<ApiResponseModel<string>>{
  const url = this.apiBaseUrl+this.publicApi.validateToken;
  return this._httpClient.post<ApiResponseModel<string>>(url, token);
 }

 sendEmailVerificationRequest():Observable<ApiResponseModel<string>>{
  const url = `${this.apiBaseUrl+this.publicApi.sendEmailVerification}`;
  return this._httpClient.get<ApiResponseModel<string>>(url);
 }

 verifyEmailCode(verificationCode : string | null):Observable<ApiResponseModel<string>>{
  if(verificationCode===null){
    throw new Error("Verification Code null");
  }
  const url =`${this.apiBaseUrl+this.publicApi.verifyCode(verificationCode)}`;
  return this._httpClient.get<ApiResponseModel<string>>(url);
 }



}//ends class.
