import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { Router } from '@angular/router';
import { UserRegisterRequest } from '../../../core/api/models/request/userRegisterRequest';
import { ApiResponseModel } from '../../../core/api/models/response/responseModel/apiResponseModel';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _router : Router = inject(Router);   
  private _publicService : PublicApiServiceService = inject(PublicApiServiceService); 
  userObj : UserRegisterRequest = new UserRegisterRequest();
  public errorStatus = false;
  public registrationErrorMessage = "";


  onRegister():void{
    this._publicService.userRegister(this.userObj).subscribe({
      next: (response: ApiResponseModel<string>) => {
        console.log(response.data);
        //routes to LoginPage after successful registration  with @param regustrationStatus=true;
        this.toLoginPage({registrationStatus: true});
      },
      error: (error) => {
        console.log("error registering new user : ", error);
        this.errorStatus = true;
        //if error is 500 show custom message else show the message from the apiResponse.
        this.registrationErrorMessage = (error.code=500) ? "Unable to Register, Something Went Wrong" : error.error.message; 
      },
      complete: () => console.log("Completed Successfully.") 

    })
  }   

  //Method: Redirects to the LoginPage with @param(registrationStatus).
  toLoginPage(queryParams:{[key:string] : any}):void{
    this._router.navigate(["login"], {queryParams});
    // this._router.navigate( ["login"], {queryParams: {registrationStatus: true} });

  }

  //Method: Closes the Error message shown if the registration is failed.
  closeErrorMessage(){
    this.errorStatus = false;
  }






}//ends class
