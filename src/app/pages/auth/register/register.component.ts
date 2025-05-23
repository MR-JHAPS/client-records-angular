import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { Router, RouterLink } from '@angular/router';
import { UserRegisterRequest } from '../../../core/models/request/userRegisterRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { ProgressbarConfig, ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-register',
  imports: [FormsModule, ProgressbarModule ,CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _router : Router = inject(Router);   
  private _publicService : PublicApiServiceService = inject(PublicApiServiceService); 
  userObj : UserRegisterRequest = new UserRegisterRequest();
  _toastrService = inject(ToastrService);
  public errorStatus = false;
  public registrationErrorMessage = "";
  progressValue = 0;
  isProgressBarActive = false;
  intervalId : any;


  onRegister():void{
    this._publicService.userRegister(this.userObj).subscribe({
      next: (response: ApiResponseModel<string>) => {
        console.log(response.data);
        //routes to LoginPage after successful registration  with @param regustrationStatus=true;
        this._toastrService.success("User Registered Successfully.");
        setTimeout(()=>{
          this._router.navigateByUrl("/login");
        }, 2000)
        this.toLoginPage({registrationStatus: true});
      },
      error: (error) => {
        console.log("error registering new user : ", error);
        // this.errorStatus = true;
        this._toastrService.error("Error! Registration Failed");
        //if error is 500 show custom message else show the message from the apiResponse.
        // this.registrationErrorMessage = (error.code=500) ? "Unable to Register, Something Went Wrong" : error.error.message; 
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
  // closeErrorMessage(){
  //   this.errorStatus = false;
  // }

loadProgressBar(){
  this.isProgressBarActive = true;
  this.startProgressBar();
}


/* This is to generate the dynamic progress bar of given time interval. */
startProgressBar():void{
  const totalDuration = 5000;
  const stepTime = 50;
  const stepValue = 100/(totalDuration/stepTime);

  this.progressValue = 0;

  setInterval(()=>{
    this.progressValue = this.progressValue + stepValue;
    if(this.progressValue>=100){
      this.progressValue = 100;
      clearInterval(this.intervalId);
    }
  },stepTime)


}



}//ends class
