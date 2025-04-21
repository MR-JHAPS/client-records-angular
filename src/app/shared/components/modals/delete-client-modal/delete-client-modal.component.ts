import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';

@Component({
  selector: 'app-delete-client-modal',
  imports: [],
  templateUrl: './delete-client-modal.component.html',
  styleUrl: './delete-client-modal.component.css'
})
export class DeleteClientModalComponent {

  private _clientService = inject(ClientApiServiceService);

  @Output() isClientDeleted = new EventEmitter<boolean>();
  @Output() clientDeleteCancelled = new EventEmitter<void>();

  clientId : number ;


  clientCount: number = 1;
 /*  onConfirm: () => void = () => {};
  onDecline: () => void = () => {}; */

  constructor(public bsModalRef: BsModalRef) {}

  

  decline(): void {
    this.clientDeleteCancelled.emit();
    this.bsModalRef.hide();
  }



  confirm(): void {
    console.log(this.clientId);
    this.deleteClient(this.clientId);
    this.bsModalRef.hide();
  }




  deleteClient(clientId : number):void{
    this._clientService.deleteClient(clientId).subscribe({
      next : (response : ApiResponseModel<string>) =>{
          this.isClientDeleted.emit(true);
        },
        error : (error) => {
          this.isClientDeleted.emit(false);
          console.log("Error! Failed Deleting Client", error);
        },
        complete : () => {
          console.log("Client Deletion Successfull");
        }
    })
  }


}
