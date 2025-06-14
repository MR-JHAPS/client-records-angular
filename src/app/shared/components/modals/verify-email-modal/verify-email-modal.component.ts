import { Component, inject } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PublicApiServiceService } from '../../../../core/services/public-api/public-api-service.service';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email-modal',
  imports: [],
  templateUrl: './verify-email-modal.component.html',
  styleUrl: './verify-email-modal.component.css'
})
export class VerifyEmailModalComponent {

  _router = inject(Router);
  _toastrService = inject(ToastrService);
  _publicApiService = inject(PublicApiServiceService);
  _modalService = inject(BsModalService);




sendEmailVerification():void{
  this._publicApiService.sendEmailVerificationRequest().subscribe({
    next : (response : ApiResponseModel<string>) =>{
      console.log("Verification Email sent to the user." + response);
      this._toastrService.info("Sending Verification Email.");
      this._modalService.hide();
      this._router.navigateByUrl("/emailVerification");
    },
    error : (error)=>{
      this._toastrService.error("Unable to Send verification Code.");
      console.log("Unable to send the verification Email." , error);
    },
    complete : ()=>{
      console.log("Email Sent Successfully.");
    }
  })
  
}//ends method.






}//ends class.
