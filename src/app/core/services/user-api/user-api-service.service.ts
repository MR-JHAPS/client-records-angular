import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { UserGeneralResponse } from '../../models/response/userGeneralResponse';
import { UserUpdateRequest } from '../../models/request/userUpdateRequest';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { UserImageUploadRequest } from '../../models/request/userImageUploadRequest';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);
  private apiBaseUrl = API_ENDPOINTS.apiBaseUrl; //this is the base url
  private userEndpoints = API_ENDPOINTS.userApi; //this contains the api of users
 
  



  getCurrentUser():Observable<ApiResponseModel<UserGeneralResponse>>{
   return this._httpClient.get<ApiResponseModel<UserGeneralResponse>>(`${this.apiBaseUrl}${this.userEndpoints.getCurrentUser}`);
  }

  updateCurrentUser(userDetails : UserUpdateRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl}${this.userEndpoints.updateCurrentUser}`;
    return this._httpClient.put<ApiResponseModel<string>>(url, userDetails);
  }

  updateProfilePicture(imageRequest : UserImageUploadRequest) : Observable<ApiResponseModel<string>>{
    // Appending the file (key matches backend's `ImageRequest field` name)
    const formData = new FormData();
    formData.append("imageFile", imageRequest.imageFile);
    formData.append("imageName", imageRequest.imageName);

    const url = `${this.apiBaseUrl+this.userEndpoints.updateProfilePicture}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, formData);
  }

  removeProfilePicture() : Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.userEndpoints.removeProfilePicture}`;
    return this._httpClient.delete<ApiResponseModel<string>>(url);
  }

  deleteCurrentAccount(): Observable<ApiResponseModel<string>>{
    const url = `${this.apiBaseUrl+this.userEndpoints.deleteCurrentUser}`;
    return this._httpClient.delete<ApiResponseModel<string>>(url);
  }




    

}//ends class
