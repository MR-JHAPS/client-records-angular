import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { UserAdminResponse } from '../../models/response/userAdminResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseUrl = API_ENDPOINTS.apiBaseUrl;
  private adminApi = API_ENDPOINTS.adminApi;
  private _httpClient = inject(HttpClient);



  /* This will contain the response of user with roles .*/
getUserById(id : number) : Observable<ApiResponseModel<UserAdminResponse>>{
  const url = `${this.baseUrl}${this.adminApi.getUserById}/${id}`;
  return this._httpClient.get<ApiResponseModel<UserAdminResponse>>(url);
}

/* Response will be with pagination and data(contents:Array<T(userAdmin)>, links, page)*/
getAllUsers(){

}

/* We pass the name of the role and we get the list of the user's with that role.*/
getUsersByRole(){

}

/* Searching the user using the email. Email is uniqueKey in UserDatabase so it will return only one user. */
/* For this we don't need Pagination so the return type can be of I_ApiResponseModel that don't contain the pagination details.*/
searchUserByEmail(){

}

updateUserRole(){

}

updateCurrentAdmin(){

}

deleteCurrentAdmin(){

}






}//ends class
