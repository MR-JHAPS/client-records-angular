import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PublicApiServiceService } from '../public-api/public-api-service.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Router } from '@angular/router';
import { TokenValidateRequest } from '../../api/models/request/tokenValidateRequest';
import { ApiResponseModel } from '../../api/models/response/responseModel/apiResponseModel';
import { JwtServiceService } from '../jwtService/jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService   {  

  private _publicService = inject(PublicApiServiceService);
  private _jwtService = inject(JwtServiceService);
  private _route = inject(Router);
  tokenRequestDto : TokenValidateRequest = new TokenValidateRequest() ;
 
  /* Auth state subject */
  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isTokenValid : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRoleAdmin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /* Public Observables. */
  isLoggedIn$ = this.isLoggedIn.asObservable(); 
  isTokenValid$ = this.isTokenValid.asObservable();
  isRoleAdmin$ = this.isRoleAdmin.asObservable();

  constructor(){
    this.initializeAuthState();
  }


initializeAuthState(){
  console.log("I am inside the initializeAuthState() in authService")
  const token = this.getToken();
  if(token){
    let roles : Array<string> = this.getRoleFromtoken(token);
    if(roles.includes("admin")){
      this.isRoleAdmin.next(true);
    }
    this.isLoggedIn.next(true);
    this.tokenRequestDto.setTokenName(token);
    this.validateToken(this.tokenRequestDto);
  }
  /* This condition fixed the issue of automatic validation when app start even without being logged in.*/
  else if(token==null){ 
    console.log("no token found");
  }else{
    this.clearAuthState();
  }

}



  /* Gets the logged in user from localStorage using key 'loggedInUser' */
getLoggedInUser(): string | null {
 return localStorage.getItem("loggedInUser");
}

/* Gets the token from localStorage using userEmail as key. */
getToken(): string | null{
  const loggedInUser = this.getLoggedInUser();
  if(!loggedInUser) {
    console.log("No logged in user to get token from.");
    return null;
  };
  return localStorage.getItem(loggedInUser);
}

getRoleFromtoken(token: string): Array<string> | null{
  return this._jwtService.getRole(token);
}



/* If the currentUserExist then then remove them from the localStorage and set the logged in status as false. */
clearAuthState():void{
  console.log("Clearing AuthState.");
  const currentUser = this.getLoggedInUser();
  if(currentUser){
    localStorage.removeItem(currentUser); /* This removes the token-value --> ([user : key] : [token : value]) */
    localStorage.removeItem("loggedInUser"); /* This removes the current user-value --> (['loggedInUser': key]: [ user : value])*/
  }
    this.isLoggedIn.next(false);
    this.isTokenValid.next(false);
}


/* Validating token. calling the validateToken api to check if the token is valid and
   user is logged in using valid token. */
validateToken(tokenRequest : TokenValidateRequest): void{
  this._publicService.validateToken(tokenRequest).subscribe({
    next : ( response : ApiResponseModel<string>) => {
      this.isLoggedIn.next(true);
      this.isTokenValid.next(true);
      console.log("validating token : " , response);
    },
    error : (error) =>{
      this.clearAuthState();
      console.log("error validating the token. Redirecting to login Page.", error);
      // setTimeout(()=>{
        this._route.navigateByUrl("login");
      // }, 1000);
      
      

    },
    complete : () =>{
      console.log("Token validation complete.");
    }
    
  })
}




 loggedIn(){
  this.isLoggedIn.next(true) ;
 }

 loggedOut(){
  this.isLoggedIn.next(false);
 }










}//ends class
