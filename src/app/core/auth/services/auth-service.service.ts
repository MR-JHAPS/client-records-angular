import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PublicApiServiceService } from '../../services/public-api/public-api-service.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Router } from '@angular/router';
import { TokenValidateRequest } from '../../models/request/tokenValidateRequest';
import { JwtServiceService } from '../../services/jwtService/jwt-service.service';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService   {  

  private _publicService = inject(PublicApiServiceService);
  private _jwtService = inject(JwtServiceService);
  private _route = inject(Router);
  tokenValidateRequest : TokenValidateRequest = new TokenValidateRequest() ;
 
  /* Auth state subject */
  // isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isTokenValid : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRoleAdmin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRoleUser :  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /* Public Observables. */
  // isLoggedIn$ = this.isLoggedIn.asObservable(); 
  isTokenValid$ = this.isTokenValid.asObservable();
  isRoleAdmin$ = this.isRoleAdmin.asObservable();
  isRoleUser$ = this.isRoleUser.asObservable();

  constructor(){
    this.initializeAuthState();
  }


  initializeAuthState() {
    const token = this.getToken();
    if (token) {
      this.tokenValidateRequest.setTokenName(token);
      this.validateToken(this.tokenValidateRequest);
    } else {
      this.clearAuthState();
    }
  }


// initializeAuthState(){
//   console.log("I am inside the initializeAuthState() in authService")
//   const token = this.getToken();
//   if(token){
//       const roles = this.getRoleFromtoken(token);
//       if(roles.includes("admin")){
//         this.isRoleAdmin.next(true);
//       }
//       else {
//         this.isRoleUser.next(true);
//       }
    
//     this.tokenValidateRequest.setTokenName(token);
//     this.validateToken(this.tokenValidateRequest);
//   }
//   /* This condition fixed the issue of automatic validation when app start even without being logged in.*/
//   else if(token==null){ 
//     console.log("no token found");
//   }else{
//     this.clearAuthState();
//   }

// }



// In AuthService
updateAuthState(token: string): void {
  const roles = this.getRoleFromtoken(token);
  this.isRoleAdmin.next(roles.includes("admin"));
  this.isRoleUser.next(roles.includes("user") || !roles.includes("admin"));
  this.isTokenValid.next(true);
  this.tokenValidateRequest.setTokenName(token);
  this.validateToken(this.tokenValidateRequest);
}


/*-------------------------LOCAL STORAGE----------------------------------------------------*/

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


  clearAuthState():void{
    console.log("Clearing AuthState.");
    const currentUser = this.getLoggedInUser();
    if(currentUser){
      localStorage.removeItem(currentUser); /* This removes the token-value --> ([user : key] : [token : value]) */
      localStorage.removeItem("loggedInUser"); /* This removes the current user-value --> (['loggedInUser': key]: [ user : value])*/
    }
      this.isRoleAdmin.next(false);
      this.isRoleUser.next(false);
      // this.isLoggedIn.next(false);
      this.isTokenValid.next(false);
  }

  /*-------------------------JWT.getRoles----------------------------------------------------*/

  getRoleFromtoken(token: string): Array<string> {
    const roles =  this._jwtService.getRole(token);
    return roles ? roles : new Array<string> ;
  }


  /*------------------------------Token Validation REQUEST-----------------------------------------------*/
  /* Validating token. calling the validateToken api to check if the token is valid and
    user is logged in using valid token. */
  validateToken(tokenRequest : TokenValidateRequest): void{
    this._publicService.validateToken(tokenRequest).subscribe({
      next : ( response : ApiResponseModel<string>) => {
        if(this.getRoleFromtoken(tokenRequest.getTokenName()).includes("admin")){
          this.isRoleAdmin.next(true);
        }else{
          this.isRoleUser.next(true);
        }

        // this.isLoggedIn.next(true);
        this.isTokenValid.next(true);
        console.log("validating token : " , response);
      },
      error : (error) =>{
        this.clearAuthState();
        console.log("error validating the token. Redirecting to login Page.", error);
          this._route.navigateByUrl("login");
      },
      complete : () =>{
        console.log("Token validation complete.");
      }
    })//ends-subscribe
  }




 /*  loggedIn(){
    this.isLoggedIn.next(true) ;
  } */

  loggedOut(){
    // this.isLoggedIn.next(false);
    this.isRoleUser.next(false);
    this.isRoleAdmin.next(false);
  }










}//ends class
