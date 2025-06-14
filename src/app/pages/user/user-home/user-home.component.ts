import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
import { SubMenuComponent } from "../../../layout/sub-menu/sub-menu.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VerifyEmailModalComponent } from '../../../shared/components/modals/verify-email-modal/verify-email-modal.component';
import { EmailVerificationStatusService } from '../../../shared/services/emailVerificationCommunication/email-verification-status.service';
// import { UserMenuCommunicationService } from '../../../shared/services/userMenuCommunication/user-menu-communication.service';

@Component({
  selector: 'app-user-home',
  imports: [RouterOutlet, ClientTableComponent, SubMenuComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent  implements OnInit {

  bsModalRef = inject(BsModalRef);
  _modalService = inject(BsModalService);
  _emailVerificationCommunication = inject(EmailVerificationStatusService);



ngOnInit(): void {
    this.checkEmailVerificationStatus();
}

  checkEmailVerificationStatus():void{
    this._emailVerificationCommunication.isEmailVerified$.subscribe((verified)=>{
      if(!verified){
        this.openEmailVerificationModal();
        console.log("User Email is not verified in UserHome Component");
      }else{
        console.log("User Email has Already been verified in UserComponent.");
      }
    })
  }


openEmailVerificationModal(): void {
  this.bsModalRef = this._modalService.show(VerifyEmailModalComponent);
  // Handle manualmodal close
  // this.bsModalRef.content.closeInsertClient.subscribe(() => {
  //   this._modalService.hide();
  // });
  
}





}//ends class
