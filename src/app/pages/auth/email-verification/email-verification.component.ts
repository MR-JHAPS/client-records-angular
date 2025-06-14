import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { VerifyEmailModalComponent } from '../../../shared/components/modals/verify-email-modal/verify-email-modal.component';

@Component({
  selector: 'app-email-verification',
  imports: [RouterLink],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {

  // "!" this signifies that it will be initialized and won't be undefined
  @ViewChild(VerifyEmailModalComponent) verifyEmailModalComponent !: VerifyEmailModalComponent;

    _publicApiService = inject(PublicApiServiceService);
    route  = inject(ActivatedRoute);
    _toastrService = inject(ToastrService);

    dynamicUserHome : string;
    isEmailVerified = false;
    verificationCode : null | string;
    isVerificationCodePresent : boolean = false;

    ngOnInit(): void {
       this.extractVerificationCodeIfPresent();
       this.checkIfReadyForVerification();
    }

    

    /* This extracts the verification code from the url */
    extractVerificationCodeIfPresent() : void{
       this.route.queryParamMap.subscribe((param)=>{
          const verificationCode = param.get("verification_code");
          this.verificationCode = verificationCode;
        })
    }


    checkIfReadyForVerification(){
      if(this.verificationCode!==null){
        console.log("Verification Code is not null So, Initializing the user Email Verification.");
        this.verifyUserEmail(this.verificationCode);
      }else{
        console.log("Verification Code not yet provided from the email.");
      }
    }
    

    verifyUserEmail(verificationCode : string):void{
      this._publicApiService.verifyEmailCode(verificationCode).subscribe({
        next : (response : ApiResponseModel<string>)=>{
          console.log("Verifying User Email.");
          this.isEmailVerified = true;
          this._toastrService.success("Email Verified Successfully.");
        },
        error : (error) =>{
          console.log("Error verifying the User Email", error);
          this._toastrService.error("Unable to Verify the Email.");
        },
        complete : () =>{
          console.log("User Email Verified Successfully.");
        }
      })
    }


    //this will call the method of VerifyEmailModalComponent.
    resendVerificationLink():void{
      this.verifyEmailModalComponent.sendEmailVerification();
    }
    

    createCountDown(){

    }






}
