import { inject, Injectable } from '@angular/core';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { Observable } from 'rxjs';
import { BulkImageDeleteRequest } from '../../models/request/bulkImageDeleteRequest';
import { FileRequest } from '../../models/request/fileRequest';
import { FileResponse } from '../../models/response/fileResponse';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../constants/apiEndpoints.const';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  
    _httpClient = inject(HttpClient);
    _baseUrl = API_ENDPOINTS.apiBaseUrl;
    _fileEndpoints = API_ENDPOINTS.fileApi;
  
  
  
  
    public getAllFilesOfUser(): Observable<ApiResponseModelPaginated<FileResponse>>{
      const url = `${this._baseUrl+this._fileEndpoints.getAllFilesOfAuthenticatedUser}`;
      return this._httpClient.get<ApiResponseModelPaginated<FileResponse>>(url);
    }
  
  
    public getFilesById(id: number) : Observable<ApiResponseModel<FileResponse>>{
      const url = `${this._baseUrl+this._fileEndpoints.getFileById(id)}`;
      return this._httpClient.get<ApiResponseModel<FileResponse>>(url);
    }
  
  
    public uploadFileForAuthenticatedUser(fileRequest : FileRequest) : Observable<ApiResponseModel<string>>{
     // Appending the file (key matches backend's `ImageRequest field` name)
      const formData = new FormData();
      formData.append("file", fileRequest.file);
      formData.append("fileName", fileRequest.fileName);
     
      const url = `${this._baseUrl+this._fileEndpoints.uploadFileForAuthenticatedUser}`;
      return this._httpClient.post<ApiResponseModel<string>>(url, formData);
    }
  
    public deleteFileById(fileId : number) : Observable<ApiResponseModel<string>>{
      const url = `${this._baseUrl+this._fileEndpoints.deleteFileById(fileId)}`;
      return this._httpClient.delete<ApiResponseModel<string>>(url);
    }
  
    public deleteMultipleFilesById(idList : BulkImageDeleteRequest) : Observable<ApiResponseModel<string>>{
      const url = `${this._baseUrl+this._fileEndpoints.deleteMultipleFileById}`;
      return this._httpClient.delete<ApiResponseModel<string>>(url, { body : idList });
    }
  
  
  


}
