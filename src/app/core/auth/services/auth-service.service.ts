import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PublicApiServiceService } from '../../services/public-api/public-api-service.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Router } from '@angular/router';
import { TokenValidateRequest } from '../../models/request/tokenValidateRequest';
import { JwtServiceService } from '../../services/jwtService/jwt-service.service';
import { ApiResponseModel } from '../../models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService   {  

  private _toastrService = inject(ToastrService);
  private _publicService = inject(PublicApiServiceService);
  private _jwtService = inject(JwtServiceService);
  private _route = inject(Router);
  tokenValidateRequest : TokenValidateRequest = new TokenValidateRequest() ;
 
  /* Auth state subject */
  isRoleAdmin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isRoleUser :  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /* Public Observables. */
  isRoleAdmin$ = this.isRoleAdmin.asObservable();
  isRoleUser$ = this.isRoleUser.asObservable();

  constructor(){
    this.initializeAuthState();
  }


  initializeAuthState() {
  const token = this.getToken(); //getting from localStorage
  if (token) {
    const tokenRoles = this.getRoleFromtoken(token);
    this.isRoleAdmin.next(tokenRoles.includes("admin"));
    this.isRoleUser.next(tokenRoles.includes("user"));
    // this.isTokenValid.next(true); // Assume valid until proven otherwise
    this.tokenValidateRequest.setTokenName(token);
    this.validateToken(this.tokenValidateRequest); // Secondary check
  }  else{
    this.clearAuthState();
  }
}




// In AuthService
// updateAuthState(token: string): void {
//   const roles = this.getRoleFromtoken(token);
//   // this.isTokenValid.next(true);
//   this.tokenValidateRequest.setTokenName(token);

//   this.isRoleAdmin.next(roles.includes("admin"));
//   this.isRoleUser.next(roles.includes("user"));
  
//   this.validateToken(this.tokenValidateRequest);
// }


/*-------------------------LOCAL STORAGE----------------------------------------------------------------*/

  /* Gets the logged in user from localStorage using key 'loggedInUser' */
  getLoggedInUser(): string | null {
    console.log("Getting LoggedIn User Email/Name.");
  return localStorage.getItem("loggedInUser");
  }

  /* Gets the token from localStorage using userEmail as key. */
  getToken(): string | null{
    const loggedInUser = this.getLoggedInUser();
    if(!loggedInUser) {
      console.log("No logged in user to get token from.");
      return null;
    };
    console.log("Getting Token of LoggedIn User.");
    return localStorage.getItem(loggedInUser);
  }
/*-----------------------------------------------------------------------------------------------------------------*/

  clearAuthState():void{
    console.log("Clearing AuthState from localStorage.");
    const currentUser = this.getLoggedInUser();
    if(currentUser){
      localStorage.removeItem(currentUser); /* This removes the token-value --> ([user : key] : [token : value]) */
      localStorage.removeItem("loggedInUser"); /* This removes the current user-value --> (['loggedInUser': key]: [ user : value])*/
    }
      this.isRoleAdmin.next(false);
      this.isRoleUser.next(false);
  }

  /*-------------------------JWT.getRoles----------------------------------------------------*/

  getRoleFromtoken(token: string): Array<string> {
    console.log("Getting role from JWT TOken.");
    const roles =  this._jwtService.getRole(token);
    console.log("This is the roles obtained from JWT Token : ", roles![0]);
    return roles ? roles : new Array<string> ;
  }


  /*------------------------------Token Validation REQUEST-----------------------------------------------*/
  /* Validating token. calling the validateToken api to check if the token is valid. */
    validateToken(tokenRequest: TokenValidateRequest): void {
      this._publicService.validateToken(tokenRequest).subscribe({
        next: (response: ApiResponseModel<string>) => {
          console.log("Validating Token. Token valid.");
          this.checkRoleAndRedirect(tokenRequest.getTokenName()); //redirects to respective home as per token roles.
        },
        error: (error) => {
          console.log("Token Invalid, Redirecting to Login page & clearing localStorage",error);
          this.clearAuthState();
          this._route.navigateByUrl("login");
        }
      });
    }


    //checks roles from token and redirects to respective home.
    checkRoleAndRedirect(token : string) :void {
      const tokenRoles = this.getRoleFromtoken(token);
      const currentUrl = this._route.url;
      if(tokenRoles.includes("admin") ){
        if(!currentUrl.startsWith("/admin") ){
          console.log("redirecting to Admin Home");
          this._route.navigateByUrl("/admin/admin-home");
        }

      }else if(tokenRoles.includes("user")){
        if(!currentUrl.startsWith("/user")){
          console.log("redirecting to User Home");
          this._route.navigateByUrl("/user/user-home");
        }
      }else{
        console.log("redirecting to Index-Home reason: Invalid Role");
         this._route.navigateByUrl("/login");
      }
    }

 /*  loggedIn(){
    this.isLoggedIn.next(true) ;
  } */

  loggedOut(){
    this.isRoleUser.next(false);
    this.isRoleAdmin.next(false);
    this.clearAuthState();
    this._route.navigateByUrl("/login");
  }










}//ends class
