import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserAuth } from '../../models/userAuth';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {

  _httpClient : HttpClient = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl; //this is the base url
  private userEndpoints = environment.userEndpoint; //this contains the api of users
 
  


 /*  userLogin(credentials:{email:string, password:string}):Observable<any>{
    return this._httpClient.post<UserAuth>(this.apiBaseUrl+this.publicEndpoints.login, credentials);
  } */



  constructor() { }
}
