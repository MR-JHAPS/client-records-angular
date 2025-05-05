import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { RoleResponse } from '../../models/response/roleResponse';
import { RoleSaveRequest } from '../../models/request/roleSaveRequest';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

  _httpClient = inject(HttpClient);
  _baseUrl = API_ENDPOINTS.apiBaseUrl;
  _roleEndpoints = API_ENDPOINTS.roleApi;


  getAllRoles() : Observable<ApiResponseModel<RoleResponse>>{
    const url = `${this._baseUrl+this._roleEndpoints.getAllRoles}`;
    return this._httpClient.get<ApiResponseModel<RoleResponse>>(url);
  } 


  saveNewRole(request : RoleSaveRequest) : Observable<ApiResponseModel<string>> {
    const url = `${this._baseUrl+this._roleEndpoints.saveNewRole}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, request);
  }








}//ends class
