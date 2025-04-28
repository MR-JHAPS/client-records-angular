import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponseModelPaginated } from '../../models/responseModel/apiResponseModelPaginated';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {


  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);
  _httpClient = inject(HttpClient);


   getRequiredPage(pageHref: string): Observable<ApiResponseModelPaginated<any>>{
     /* if the url is provided directly */
     /* if(!pageHref){
         return throwError(()=> new Error("Error Unable to find the pageHref: url"))
      } */
      return this._httpClient.get<ApiResponseModelPaginated<any>>(pageHref);
    }





}//ends class
