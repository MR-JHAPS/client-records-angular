import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { UserRegisterDto } from '../../../core/models/userRegisterDto';
import { FormsModule } from '@angular/forms';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { ApiResponseClient } from '../../../core/models/apiResponseClient';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../core/models/apiResponse';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _router : Router = inject(Router);   

  userObj : UserRegisterDto = {
        email:"",
        password:"" 
      }
  
  // public responseMessage : string = "";   //this is to store the message of registration status.
  
  private _publicService : PublicApiServiceService = inject(PublicApiServiceService); 
  public errorStatus = false;
  public errorMessage = "";


  onRegister():void{
    this._publicService.userRegister(this.userObj).subscribe({
      next: (ApiResponse) => {
        // this.responseMessage = ApiResponse.data;
        console.log(ApiResponse.data);
        
        this.toLoginPage({registrationStatus: true});
        // this._router.navigate(["login"],{queryParams: {registrationStatus: true, registrationMessage: this.responseMessage}});
       
      },
      error: (error) => {
        console.log("error registering new user : ", error);
        this.errorStatus = true;
        this.errorMessage = (error.code=500)?"Unable to Register, Something Went Wrong":error.error.message; //if error is 500 show custom message else show the message from the apiResponse.
      },
      complete: () => console.log("Completed Successfully.") 

    })
  }   


  toLoginPage(queryParams:{[key:string] : any}):void{
    this._router.navigate(["login"], {queryParams});
  }

closeRegistrationMessage(){
  this.errorStatus = false;
}






}//ends class
