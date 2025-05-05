import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';
import { ImageResponse } from '../../models/response/imageResponse';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { ImageRequest } from '../../models/request/imageRequest';
import { BulkImageDeleteRequest } from '../../models/request/bulkImageDeleteRequest';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  _httpClient = inject(HttpClient);
  _baseUrl = API_ENDPOINTS.apiBaseUrl;
  _imageEndpoints = API_ENDPOINTS.imageApi;




  public getAllImagesOfUser(): Observable<ApiResponseModelPaginated<ImageResponse>>{
    const url = `${this._baseUrl+this._imageEndpoints.getAllImagesOfAuthenticatedUser}`;
    return this._httpClient.get<ApiResponseModelPaginated<ImageResponse>>(url);
  }


  public getImagesById(id: number) : Observable<ApiResponseModel<ImageResponse>>{
    const url = `${this._baseUrl+this._imageEndpoints.getImageById(id)}`;
    return this._httpClient.get<ApiResponseModel<ImageResponse>>(url);
  }


  public uploadImageForAuthenticatedUser(imageRequest : ImageRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this._baseUrl+this._imageEndpoints.uploadImageForAuthenticatedUser}`;
    return this._httpClient.post<ApiResponseModel<string>>(url, imageRequest);
  }

  public deleteImageById(imageId : number) : Observable<ApiResponseModel<string>>{
    const url = `${this._baseUrl+this._imageEndpoints.deleteImageById(imageId)}`;
    return this._httpClient.delete<ApiResponseModel<string>>(url);
  }

  public deleteMultipleImageById(idList : BulkImageDeleteRequest) : Observable<ApiResponseModel<string>>{
    const url = `${this._baseUrl+this._imageEndpoints.deleteMultipleImageById}`;
    return this._httpClient.delete<ApiResponseModel<string>>(url, { body : idList });
  }





}//ends service
