import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { AuthServiceService } from '../../../core/auth/services/auth-service.service';
import { UserAuthRequest } from '../../../core/models/request/userAuthRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { Toast, ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { LoginResponse } from '../../../core/models/response/loginResponse';
import { EmailVerificationStatusService } from '../../../shared/services/emailVerificationCommunication/email-verification-status.service';
import { LoginFailureResponse } from '../../../core/models/response/loginErrorResponse';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [FormsModule, FooterComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private _toastrService = inject(ToastrService);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthServiceService);//this is to handle the menu depending on logged in or logged out.
  private _publicController : PublicApiServiceService = inject(PublicApiServiceService);
  private _emailVerificationCommunication = inject(EmailVerificationStatusService);
  private _router : Router = inject(Router); 
  token : string = "";  // this is placeholder for token response.
  user : UserAuthRequest = new UserAuthRequest();
  loginResponse : LoginResponse;
  //User Email Registration Status.
  public registrationStatus = false;
  public registrationMessage ="";

  remainingLoginAttempts : number;

    

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['updated']) {
        this._toastrService.success("Account Updated, Login with new credentials.");
      }
    });
  }




  onLogin():void{
    this._publicController.userLogin(this.user).subscribe({
        next : (response: ApiResponseModel<LoginResponse>)=>{
          this.loginResponse = response.data;
          localStorage.setItem("loggedInUser", this.user.email); //saving logged_userEmail with the "loggedInUser" as key.
          localStorage.setItem(this.user.email, this.loginResponse.token);    //saving token with the userEmail as key.
          localStorage.setItem(this.user.email+"_refreshToken", this.loginResponse.refreshToken);
          console.log("User logged in successfully.", this.loginResponse);

          /* This is to show/hide verify-Email-Modal accordingly. */
          const emailRegistrationStatus = this.loginResponse.emailVerified;
          if(emailRegistrationStatus===true){
            this._emailVerificationCommunication.setEmailVerified();
          }else{
            this._emailVerificationCommunication.setEmailNotVerified();
          }

          //validates TOken/roles and redirects to respective homepage(admin/user)
          this._authService.initializeAuthState();
         

        },   
        // error : (error: ApiResponseModel<LoginFailureResponse>) =>{
        error : (error: HttpErrorResponse) => {
          const customErrorResponse = error.error as ApiResponseModel<LoginFailureResponse>;
          console.log("error Type : " , error); //this works
          //2026-07-22 updated code
          // this.remainingLoginAttempts = customErrorResponse.data.remainingAttempts;
          // console.log("Remaining Attempts : ", this.remainingLoginAttempts);
          const status = customErrorResponse.status;
          this.checkErrorStatus(status);
         
        },
        complete : () => {
          console.log("completed")
        }


    })
  }


closeRegistrationMessage(){
  this.registrationStatus = false;
}


  checkErrorStatus(status : number) : any {
    if(status===401){
      if(this.remainingLoginAttempts===0){
        return this._toastrService.error(`Error! Wrong Credentials.Your Account is Locked.`);
      }else{
        return this._toastrService.error(`Error! Wrong Credentials. ${this.remainingLoginAttempts} Attempts left.`);
      }
    }else if(status===423){
      return this._toastrService.error("Error! Account locked");
    }else{
      return this._toastrService.error("Error! Something Went Wrong");
    }
  }



}//ends class
