import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { UserGeneralResponse } from '../../models/response/userGeneralResponse';
import { UserUpdateRequest } from '../../models/request/userUpdateRequest';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';

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

  getCurrentUser():Observable<ApiResponseModel<UserGeneralResponse>>{
   return this._httpClient.get<ApiResponseModel<UserGeneralResponse>>(`${this.apiBaseUrl}${this.userEndpoints.getCurrentUser}`);
  }

  updateCurrentUser(userDetails : UserUpdateRequest){
    const url = `${this.apiBaseUrl}${this.userEndpoints.updateCurrentUser}`;
    return this._httpClient.put(url, userDetails);
  }

  updateProfilePicture(){
    
  }

  deleteCurrentAccount(){
    
  }




    


  constructor() { }
}
