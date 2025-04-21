import { Component, inject, OnInit } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ClientResponse } from '../../../../core/models/response/clientResponse';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ClientSearchComponent } from "../../search/client-search/client-search.component";
import { InsertClientModalComponent } from "../../modals/insert-client-modal/insert-client-modal.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrService} from 'ngx-toastr';
import { BulkClientDeleteRequest } from '../../../../core/models/request/bulkClientDeleteRequest';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { DeleteClientModalComponent } from '../../modals/delete-client-modal/delete-client-modal.component';


@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ClientSearchComponent, AlertModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
  providers: [BsModalService]
})
export class ClientTableComponent implements OnInit {
 
  

  isClientInserted : boolean | null = null;

  bsModalRef?: BsModalRef;

  private _toastrService = inject(ToastrService);
  private _clientService = inject(ClientApiServiceService);
  private _router = inject(Router);
  private _modalService = inject(BsModalService);

  clientList : Array<ClientResponse>;
  pageLinks : Array<ApiLinksDetails>;
  contentSize =10;//number of clientContent to show per page
  // selectedContentSize: number; 
  selectedClients :BulkClientDeleteRequest = new BulkClientDeleteRequest();


  ngOnInit(): void {
    this.getAllClients();
    this.pageLinks;
  }
 

  getAllClients(pageNumber?:number, pageSize?: number,
    sortBy?: string, direction?: string ) : void {

    this._clientService.getAllClients(pageNumber, pageSize).subscribe({
      next : (response: ApiResponseModelPaginated<ClientResponse>) => {
        this.clientList = response.data.content;
        //saving the list of (next, previous, last, first) page links in a variable.
        this.pageLinks = response.data.links; 
        console.log(response.data);
      },
      error : (error)=> {
        console.log("Error occured while getting all the clients.", error);
      },
      complete : () => { console.log("All client obtained Successfully.")}
    })
  }






  /*---------------- Method: Navigate to Update-Client-Page.---------------------------------------------- */
  navigateToUpdatePage(clientId: number):void{
    //redirects to clientUpdate page with user id.
    this._router.navigate(["user/client-update", clientId] );
  }



/* This method is to handle the multiple selection of the clients by id checkBox*/
  printCheckBoxNumbers(){
    const items = this.selectedClients;
    console.log(items);
  }



  /*-------------------MULTIPLE CLIENTS DELETION | CHECKBOX TOGGLE-------------------------------------*/

  //This works. It is to delete multiple clients.
  toggleClientSelection(clientId: number){
    this.selectedClients = this.selectedClients.includesClientId(clientId) 
                          ? this.selectedClients.removeClientId(clientId) 
                          : this.selectedClients.addClientId(clientId);
  }

  deleteMultipleclients(clientIdList : BulkClientDeleteRequest): void{
    this._clientService.deleteMultipleClients(clientIdList).subscribe({
      next : (response : ApiResponseModel<string>) => {
        this._toastrService.success("Multiple Clients Deleted Successfully."); //notification alert
        console.log(response.message, response.data);
      },
      error : (error) => {
        this._toastrService.error("Error! Unable to Delete the Multiple Clients.")//notification alert
        console.log("Error! Failed Deleting  multiple Clients", error);
      },
      complete : () => {
        console.log("Multiple Client Deletion Successfull");
      }
    })
  }


/* -----------------DELETE CLIENT By ID -----------------------------------*/

/* deleteClient(clientId : number):void{
  this._clientService.deleteClient(clientId).subscribe({
    next : (response : ApiResponseModel<string>) =>{
      this._toastrService.success("Client Deleted Successfully."); //notification alert
        console.log(response.message, response.data);
      },
      error : (error) => {
        this._toastrService.error("Error! Unable to Delete the Selected Client.")//notification alert
        console.log("Error! Failed Deleting Client", error);
      },
      complete : () => {
        console.log("Client Deletion Successfull");
      }
  })
} */



   

  






/*-----------------INSERT CLIENT (MODAL)----------------------------*/

openInsertClientModal(): void {
  this.bsModalRef = this._modalService.show(InsertClientModalComponent);
  this.bsModalRef.content.isClientInserted.subscribe((success : boolean)=>{
      if(success){
        this._toastrService.success("Client created Successfully.");
        this.getAllClients();
        this._modalService.hide();
      }else{
        this._toastrService.error("Error! Unable to Save the Client.")
      }
  })

  // Handle manualmodal close
  this.bsModalRef.content.closeInsertClient.subscribe(() => {
    this._modalService.hide();
  });
  
}

/*-----------------DELETE CLIENT CONFIRM (MODAL)----------------------------*/

  deleteClientModal(clientId : number):void{
    this.bsModalRef = this._modalService.show(DeleteClientModalComponent,{
          initialState : {
                       clientId : clientId //passing the id to the deleteModalComponent. (modalVariable : paramId)
            } 
          });
    this.bsModalRef.content.isClientDeleted.subscribe((isDeleted : boolean)=>{
      if(isDeleted){
        this._toastrService.success("Client Deleted Successfully");
        this.getAllClients();
      }else{
        this._toastrService.error("Error! Unable To Delete Client")
      }
    })       
  }






/*------------------- This is for the Pagination.--------------------------------------------------------------- */

//@param: action  is "prev", "next", "self", "first", "last"
toSpecificPage(action: string): void {
  //passing the list of pagination Links to the service layer.
  this._clientService.getRequiredPage(this.pageLinks, action).subscribe({
    next : (response: ApiResponseModelPaginated<ClientResponse>) => {
      this.clientList = response.data.content;
      //saving the list of (next, previous, last, first) page links in a variable.
      this.pageLinks = response.data.links; 
      console.log(response.data);
    },
    error : (error)=> {
      console.log("Error occured while getting all the clients.", error);
    },
    complete : () => { console.log("All client obtained Successfully.")}
  })
}


 /*------------------- This is for the Content Size of the page.--------------------------------------------------------------- */

 generateContentSize() : Array<number>{
  const contentSize : Array<number> = [];
  for(let i = 10; i<=40; i+=5){
    contentSize.push(i);
  }
  return contentSize;
}

//when selected in html it calls "GetAllClients" with new contentSize.
setContentPerPage(event : Event) : void{
  this.getAllClients(0, this.contentSize);
}






}//ends class.
