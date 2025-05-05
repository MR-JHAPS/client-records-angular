import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { Observable } from 'rxjs';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';
import { ImageResponse } from '../../models/response/imageResponse';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';

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







}//ends service
