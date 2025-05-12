import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ClientResponse } from '../../../../core/models/response/clientResponse';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ClientSearchComponent } from "../../search/client-search/client-search.component";
import { InsertClientModalComponent } from "../../modals/insert-client-modal/insert-client-modal.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrService} from 'ngx-toastr';
import { BulkClientDeleteRequest } from '../../../../core/models/request/bulkClientDeleteRequest';
import { DeleteClientModalComponent } from '../../modals/delete-client-modal/delete-client-modal.component';
import { ClientUpdateComponent } from "../../../../pages/user/client-update/client-update.component";
import { CommunicationServiceService } from '../../../services/communication-service.service';
import { Subscription } from 'rxjs';
import { PaginationComponent } from "../../pagination/pagination/pagination.component";
import { SearchRequest } from '../../../../core/models/request/searchRequest';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MaterialModules } from '../../../../material';



@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
            CommonModule, FormsModule,
            ClientSearchComponent, AlertModule,
            ClientUpdateComponent, PaginationComponent,
            AccordionModule, MaterialModules
          ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
  providers: [BsModalService, NgIf, NgFor]
})
export class ClientTableComponent implements OnInit, OnDestroy {

  private _toastrService = inject(ToastrService);
  private _clientService = inject(ClientApiServiceService);
  private _router = inject(Router);
  private _modalService = inject(BsModalService);
  private _communicationService = inject(CommunicationServiceService); // for  update message if client update successful.
  bsModalRef?: BsModalRef;
  clientList : Array<ClientResponse>;
  pageLinks : Array<ApiLinksDetails>; // this is for method : toSpecificPage(){} -->i.e: For pagination.
  selectedClients :BulkClientDeleteRequest = new BulkClientDeleteRequest();
  isCheckBoxChecked = false; //for the dynamic insert/delete button.
  updateSubscription : Subscription;
  searchRequest : SearchRequest;
  isMobile = false; // this stores if the viewing device is mobile/laptop.
  isLoading = true;



  ngOnInit(): void {
    this.onResize();
    this.getAllClients();
    this.pageLinks;

    /* suscribing to the communicationService behaviour subj to see if client is updated and display alert accordingly.*/
    this.updateSubscription = this._communicationService.isClientUpdated$.subscribe(
      (isUpdated: boolean) => {
        if (isUpdated) {
          this._toastrService.success("Client updated successfully");
        }
      }
    );
  }

  //This is to check the width of the screen to change table to accordian:
  @HostListener("window:resize", [])
  onResize(){
    this.checkScreen();
  }

  checkScreen(){
    this.isMobile = window.innerWidth<600 ;
  }

  readonly panelOpenState = signal(false);







  //Destroying the clientUpdate Subscription to prevent memory leak.
  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  getAllClients(pageNumber?:number, pageSize?: number,
    sortBy?: string, direction?: string ) : void {

    this._clientService.getAllClients(pageNumber, pageSize).subscribe({
      next : (response: ApiResponseModelPaginated<ClientResponse>) => {
        this.clientList = response.data.content;
        //saving the list of (next, previous, last, first) page links in a variable.
        this.pageLinks = response.data.links; 
        this.isLoading = false;
        console.log(response.data);
      },
      error : (error)=> {
        console.log("Error occured while getting all the clients.", error);
        this.isLoading = true;
      },
      complete : () => { console.log("All client obtained Successfully.")}
    })
  }

/* -----------------------------Searching Clients -------------------------------------------*/

    searchClients(searchRequest: SearchRequest ){
      this.isLoading = true
      this._clientService.searchQuery(searchRequest).subscribe({
        next : (response : ApiResponseModelPaginated<ClientResponse>)=>{
          this.clientList = response.data.content;
          this.isLoading = false;
          console.log(this.clientList);
          // this._toastrService.success("Search Complete.")
        },
        error : error => {
          this._toastrService.error("Error! Search failed.")
          this.isLoading = true;
        },
        complete : ()=>{
          console.log("Search done successfully.")
        }
      })
    }






 
 /*------------------------- Method: Navigate to Update-Client-Page.------------------------------------------------------- */

 navigateToUpdatePage(clientId: number):void{
  this._router.navigate(["user/client-update", clientId] ); //redirects to clientUpdate page with user id.
}

/*-----------------------------------INSERT CLIENT (MODAL)----------------------------------------------------------------------*/

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

/*-----------------DELETE SINGLE CLIENT BY ID  (CONFIRM MODAL)----------------------------------------------------------------------*/

  openDeleteSingleClientModal(clientId : number):void{
    this.bsModalRef = this._modalService.show(DeleteClientModalComponent,{
          initialState : {
                       clientId : clientId , //passing the id to the deleteModalComponent. (modalVariable : paramId)
                       isDeleteSingleClient : true
            } 
          });
     //IF DELETED OR FAILED TO DELETE      
    this.bsModalRef.content.isClientDeleted.subscribe((isDeleted : boolean)=>{
      if(isDeleted){
        this._toastrService.success("Client Deleted Successfully");
        this.getAllClients();
      }else{
        this._toastrService.error("Error! Unable To Delete Client")
      }
    })      
    //In case of cancelling delete with cancel button
    this.bsModalRef.content.clientDeleteCancelled.subscribe(()=>{
      this._toastrService.warning("Client Delete cancelled");
    })

  }


  /*-------------------------MULTIPLE CLIENTS DELETION | CHECKBOX TOGGLE-------------------------------------------------------*/

  // removes all the selected clients ID's .
  public resetCheckBox(){
    this.selectedClients.resetClientIdList();
    this.isCheckBoxChecked = false;
  }


  //This works. It is to delete multiple clients.
  toggleClientSelection(clientId: number){
    this.selectedClients = this.selectedClients.includesClientId(clientId) 
      ? this.selectedClients.removeClientId(clientId) 
      : this.selectedClients.addClientId(clientId);
    /* If selectedClients object contains client id , then checkBox is checked  */
    if(this.selectedClients.getClientIdList().length > 0 ){
      this.isCheckBoxChecked=true;
    }else{
      this.isCheckBoxChecked = false;
    }

  }


  openDeleteMultipleClientModal(selectedClients : BulkClientDeleteRequest) : void {
    this.bsModalRef = this._modalService.show(DeleteClientModalComponent, 
        {initialState: { selectedClients : selectedClients/*@param*/ ,
          isDeleteBulkClients : true
        }});
      this.bsModalRef.content.isClientDeleted.subscribe(( isDeleted : boolean ) =>{
        if(isDeleted){
          this._toastrService.success(`Multiple Clients(${selectedClients.getClientIdList().length}) Deleted Successfully`);
          this.getAllClients();
        }else{
          this._toastrService.error("Error! Unable To Delete Multiple Clients")
        }
      })      
      //In case of cancelling delete with cancel button
      this.bsModalRef.content.clientDeleteCancelled.subscribe(()=>{
        this._toastrService.warning("Multiple Client Deletion cancelled");
      })
  }





/*------------------------- This is for the Pagination.--------------------------------------------------------------------- */

//@param: action  is "prev", "next", "self", "first", "last"
// toSpecificPage(action: string): void {
//   //passing the list of pagination Links to the service layer.
//   this._clientService.getRequiredPage(this.pageLinks, action).subscribe({
//     next : (response: ApiResponseModelPaginated<ClientResponse>) => {
//       this.clientList = response.data.content;
//       //saving the list of (next, previous, last, first) page links in a variable.
//       this.pageLinks = response.data.links; 
//       console.log(response.data);
//     },
//     error : (error)=> {
//       console.log("Error occured while getting all the clients.", error);
//       this._toastrService.error("Error Getting the Specific Page.");
//     },
//     complete : () => { console.log("All client obtained Successfully.")}
//   })
// }


toSpecificPage(rawUrl: string): void {
  //passing the list of pagination Links to the service layer.
  this._clientService.getRequiredPage(rawUrl).subscribe({
    next : (response: ApiResponseModelPaginated<ClientResponse>) => {
      this.clientList = response.data.content;
      //saving the list of (next, previous, last, first) page links in a variable.
      this.pageLinks = response.data.links; 
      console.log(response.data);
    },
    error : (error)=> {
      console.log("Error occured while getting all the clients.", error);
      this._toastrService.error("Error Getting the Specific Page.");
    },
    complete : () => { console.log("All client obtained Successfully.")}
  })
}





 /*------------------- This is for the Content Size of the page.--------------------------------------------------------------- */
  setContentPerPage(contentSize : number) : void{
    this.getAllClients(0, contentSize);
  }






}//ends class.
