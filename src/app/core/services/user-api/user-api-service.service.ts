import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../api/constants/apiEndpoints.const';
import { UserGeneralResponse } from '../../api/models/interface/responses/userGeneralResponse';
import { Observable } from 'rxjs';
import { I_ApiResponseModel } from '../../api/models/interface/responses/apiResponseModel';
import { UserUpdateRequest } from '../../api/models/interface/requests/userUpdateRequest';

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

  getCurrentUser():Observable<I_ApiResponseModel>{
   return this._httpClient.get<I_ApiResponseModel>(`${this.apiBaseUrl}${this.userEndpoints.getCurrentUser}`);
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
