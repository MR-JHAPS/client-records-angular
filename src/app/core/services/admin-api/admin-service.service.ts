import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { UserAdminResponse } from '../../models/response/userAdminResponse';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';
import { SearchRequest } from '../../models/request/searchRequest';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { RoleSaveRequest } from '../../models/request/roleSaveRequest';
import { RoleRequest } from '../../models/request/roleRequest';
import { UserGeneralResponse } from '../../models/response/userGeneralResponse';
import { AdminUpdateRequest } from '../../models/request/adminUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseUrl = API_ENDPOINTS.apiBaseUrl;
  private adminApi = API_ENDPOINTS.adminApi;
  private _httpClient = inject(HttpClient);



  /* This will contain the response of user with roles .*/
getUserById(id : number) : Observable<ApiResponseModel<UserAdminResponse>>{
  const url = `${this.baseUrl}${this.adminApi.getUserById(id)}`;
  return this._httpClient.get<ApiResponseModel<UserAdminResponse>>(url);
}

/* Response will be with pagination and data(contents:Array<T(userAdmin)>, links, page)*/
getAllUsers() : Observable<ApiResponseModelPaginated<UserAdminResponse>>{
  const url = `${this.baseUrl+ this.adminApi.getAllUsers}`;
  return this._httpClient.get<ApiResponseModelPaginated<UserAdminResponse>>(url);
}

/* Get the authenticated admin */
getCurrentAdmin():Observable<ApiResponseModel<UserAdminResponse>>{
  return this._httpClient.get<ApiResponseModel<UserAdminResponse>>(`${this.baseUrl}${this.adminApi.getCurrentUser}`);
}



/* I put "<any>" in return type because the response in dynamic paginated and non-paginated Response. */
searchUserByRole(searchRequest : SearchRequest, pageNumber? :number, pageSize?: number) : Observable<any>{
  /* if the searchBy is not "email" and "role" then throw error. */
  if(searchRequest.searchBy !== "role"){
    throwError(()=> new Error(`User search param invalid. Expected 'role', got ${searchRequest.searchBy}`));
  }
  let params = new HttpParams()
              .set('role', searchRequest.searchQuery)
              .set('page', pageNumber?.toString()??'0') 
              .set('size', pageSize?.toString()??'10');
  /* If the searchBy is ROLE then give the paginated Response */
     const url = `${this.baseUrl+this.adminApi.getUsersByRole}`;
     
    return this._httpClient.get<ApiResponseModelPaginated<UserAdminResponse>>(url,{params})
  
}//ends method

searchUserByEmail(searchRequest : SearchRequest) : Observable<ApiResponseModel<UserAdminResponse>>{
  /* if the searchBy is not "email" and "role" then throw error. */
  if(searchRequest.searchBy !== "email" ){
    throwError(()=> new Error(`User search param invalid. Expected 'email', got ${searchRequest.searchBy}`));
  }
  /* Else the searchBy is EMAIL then give the non-paginated Response */
    let params = new HttpParams()
    const url = `${this.baseUrl+this.adminApi.searchUserByEmail}`;
    params = params.set('email', searchRequest.searchQuery);
   return this._httpClient.get<ApiResponseModel<UserAdminResponse>>(url, {params})
}//ends method


updateUserRole(userId: number, roleRequest: RoleRequest): Observable<ApiResponseModel<string>>{
  const url = `${this.baseUrl}${this.adminApi.updateUserRole(userId)}`;
  return this._httpClient.put<ApiResponseModel<string>>(url, roleRequest);
}

updateCurrentAdmin(request : AdminUpdateRequest): Observable<ApiResponseModel<string>>{
  const url = `${this.baseUrl}${this.adminApi.updateCurrentAdmin}`;
  return this._httpClient.post<ApiResponseModel<string>>(url, request);
}

deleteCurrentAdmin(){

}



 getRequiredPage(pageHref: string): Observable<ApiResponseModelPaginated<UserAdminResponse>>{
   /* if the url is provided directly */
   /* if(!pageHref){
       return throwError(()=> new Error("Error Unable to find the pageHref: url"))
    } */
    return this._httpClient.get<ApiResponseModelPaginated<UserAdminResponse>>(pageHref);
  }


}//ends class
