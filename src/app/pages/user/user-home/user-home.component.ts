import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
import { SubMenuComponent } from "../../../layout/sub-menu/sub-menu.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VerifyEmailModalComponent } from '../../../shared/components/modals/verify-email-modal/verify-email-modal.component';
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



ngOnInit(): void {
    this.openEmailVerificationModal();
}


openEmailVerificationModal(): void {
  this.bsModalRef = this._modalService.show(VerifyEmailModalComponent);
  // this.bsModalRef.content.isClientInserted.subscribe((success : boolean)=>{
  //     if(success){
  //       this._toastrService.success("Client created Successfully.");
  //       this.getAllClients();
  //       this._modalService.hide();
  //     }else{
  //       this._toastrService.error("Error! Unable to Save the Client.")
  //     }
  // })

  // Handle manualmodal close
  this.bsModalRef.content.closeInsertClient.subscribe(() => {
    this._modalService.hide();
  });
  
}





}//ends class
