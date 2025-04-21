import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { NgIf } from '@angular/common';
import { BulkClientDeleteRequest } from '../../../../core/models/request/bulkClientDeleteRequest';

@Component({
  selector: 'app-delete-client-modal',
  imports: [NgIf],
  templateUrl: './delete-client-modal.component.html',
  styleUrl: './delete-client-modal.component.css'
})
export class DeleteClientModalComponent {

  private _clientService = inject(ClientApiServiceService);

  @Output() isClientDeleted = new EventEmitter<boolean>(); 
  @Output() clientDeleteCancelled = new EventEmitter<void>(); // if you cancel the deletion.

  clientId : number ; /* this is to receive the client ID that is to be deleted ( from initial state in bsModalService in clientTable component) */
  selectedClients :BulkClientDeleteRequest = new BulkClientDeleteRequest();

  isDeleteSingleClient = false;
  isDeleteBulkClients = false;


  constructor(public bsModalRef: BsModalRef) {}

  

  decline(): void {
    this.clientDeleteCancelled.emit();
    this.bsModalRef.hide();
  }

  

/*------------------------------------- DELETE SINGLE CLIENT------------------------------------------------*/
  //HTML button calls this
  confirmSingleDelete(): void {
    console.log(this.clientId);
    this.deleteSingleClient(this.clientId);
    this.bsModalRef.hide();
  }  

  deleteSingleClient(clientId : number):void{
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







/*------------------------------------- DELETE MULTIPLE/BULK CLIENTS------------------------------------------------*/

confirmBulkDelete(){
  console.log(this.selectedClients);
  this.deleteMultipleclients(this.selectedClients);
  this.isClientDeleted.emit(true);
}

deleteMultipleclients(clientIdList : BulkClientDeleteRequest): void{
    this._clientService.deleteMultipleClients(clientIdList).subscribe({
      next : (response : ApiResponseModel<string>) => {
        // this._toastrService.success("Multiple Clients Deleted Successfully."); //notification alert
        console.log(response.message, response.data);
      },
      error : (error) => {
        // this._toastrService.error("Error! Unable to Delete the Multiple Clients.")//notification alert
        console.log("Error! Failed Deleting  multiple Clients", error);
      },
      complete : () => {
        console.log("Multiple Client Deletion Successful");
      }
    })
  }



}
