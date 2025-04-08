import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { PublicApiServiceService } from '../public-api/public-api-service.service';
import { I_ApiResponseModel } from '../../api/models/interface/responses/apiResponseModel';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { TokenValidateRequest } from '../../api/models/interface/requests/tokenValidateRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService   {  

  private _publicService = inject(PublicApiServiceService);
  tokenRequestDto : TokenValidateRequest = new TokenValidateRequest() ;
  _route = inject(Router);
  constructor(){
    this.initializeAuthState();
  }

  /* Auth state subject */
  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isTokenValid : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /* Public Observables. */
  isLoggedIn$ = this.isLoggedIn.asObservable(); 
  isTokenValid$ = this.isTokenValid.asObservable();


initializeAuthState(){
  console.log("I am inside the initializeAuthState() in authService")
  const token = this.getToken();
  if(token){
    this.isLoggedIn.next(true);
    this.tokenRequestDto.setTokenName(token);
    this.validateToken(this.tokenRequestDto);
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
validateToken(token : TokenValidateRequest){
  this._publicService.validateToken(token).subscribe({
    next : ( response : I_ApiResponseModel<string>) => {
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
