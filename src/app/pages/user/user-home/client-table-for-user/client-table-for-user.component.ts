import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { TableUIComponent } from "../../../../shared/ui/table-ui/table-ui.component";
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ClientResponse } from '../../../../core/models/response/clientResponse';
import { TableDataModel } from '../../../../core/uiModels/tableDataModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { BulkClientDeleteRequest } from '../../../../core/models/request/bulkClientDeleteRequest';
import { Router } from '@angular/router';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommunicationServiceService } from '../../../../shared/services/communication-service.service';
import { SearchUiComponent } from "../../../../shared/ui/search-ui/search-ui.component";
import { SearchRequest } from '../../../../core/models/request/searchRequest';
import { SearchDataModel } from '../../../../core/uiModels/searchDataModel';
import { AccordionUiComponent } from "../../../../shared/ui/accordion-ui/accordion-ui.component";
import { ButtonTabsComponent } from "../../../../shared/components/button-tabs/button-tabs.component";
import { ButtonDataModel } from '../../../../core/uiModels/buttonDataModel';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { NgClass } from '@angular/common';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination/pagination.component";
import { SortRequest } from '../../../../core/models/request/sortRequest';
import { ButtonVariant } from '../../../../core/uiEnums/buttonVariants';
import { InsertClientModalComponent } from '../../../../shared/components/modals/insert-client-modal/insert-client-modal.component';
import { ClientUpdateComponent } from '../../client-update/client-update.component';
import { DeleteClientModalComponent } from '../../../../shared/components/modals/delete-client-modal/delete-client-modal.component';

@Component({
  selector: 'app-client-table-for-user',
  imports: [TableUIComponent, AccordionUiComponent, SearchUiComponent, ButtonTabsComponent, NgClass, PaginationComponent],
  templateUrl: './client-table-for-user.component.html',
  styleUrl: './client-table-for-user.component.css'
})
export class ClientTableForUserComponent {


    @ViewChild(TableUIComponent) tableUi !: TableUIComponent;
    @ViewChild(AccordionUiComponent) accordianUi !: AccordionUiComponent;

      private _toastrService = inject(ToastrService);
      private _clientService = inject(ClientApiServiceService);
      private _router = inject(Router);
      private _modalService = inject(BsModalService);
      private _communicationService = inject(CommunicationServiceService); // for  update message if client update successful.
      bsModalRef?: BsModalRef;
      clientList : Array<ClientResponse>;
      pageLinks : Array<ApiLinksDetails>; // this is for method : toSpecificPage(){} -->i.e: For pagination.
      selectedClients :BulkClientDeleteRequest = new BulkClientDeleteRequest();
      // isCheckBoxChecked = false; //for the dynamic insert/delete button.
      isMobile = false; // this stores if the viewing device is mobile/laptop.
      isLoading = true;
      isSearchResultPresent = true; // this is to see if the searching contains no clients.


  
  
      clientTableColumns : TableDataModel[] = [
        { header: 'ID', contentKey: 'id' , isImportant : true},
        { header: 'First Name', contentKey: 'firstName', isImportant: true },
        { header: 'Last Name', contentKey: 'lastName' , isImportant: true},
        { header: 'Date of Birth', contentKey: 'dateOfBirth' },
        { header: 'Postal Code', contentKey: 'postalCode' }
      ]
      

      searchFields : SearchDataModel[] = [
            new SearchDataModel("Any", "searchQuery"),
            new SearchDataModel("First Name", "firstName"),
            new SearchDataModel("Last Name", "lastName"),
            new SearchDataModel("Postal Code", "postalCode")
      ]

      ButtonVariant = ButtonVariant;

    
      /* These are the button of the table */
      buttonList : ButtonDataModel[] = [
        {action:"update", icon:"fa-solid fa-pen", buttonLabel:"Update", variant: ButtonVariant.BLUE},
        {action:"delete", icon:"fa-solid fa-trash", buttonLabel:"Delete", variant: ButtonVariant.DANGER }
      ]
    
      ngOnInit(): void {
        this.getAllClients();
        this.pageLinks;
        this.onResize(); // to check the active window screen size.
    
        /* suscribing to the communicationService behaviour subj to see if client is updated and display alert accordingly.*/
        // this.updateSubscription = this._communicationService.isClientUpdated$.subscribe(
        //   (isUpdated: boolean) => {
        //     if (isUpdated) {
        //       this._toastrService.success("Client updated successfully");
        //     }
        //   }
        // );
      }



       //This is to check the width of the screen to change table to accordian:
          @HostListener("window:resize", [])
          onResize(){
            this.checkScreen();
          }
        
          checkScreen(){
            this.isMobile = window.innerWidth<700 ;
          }

    

          executeClickedButton(event : {buttonAction : string, rowId : number | null}) : void{
            switch(event.buttonAction){
              case "insert":
                return this.openInsertModal();
              
              case "update":
                return this.redirectToUpdateClientPage(event.rowId!);

              case "delete":
                return this.openDeleteSingleClientModal(event.rowId!);

              default :"insert"
            }
          }



          openInsertModal() : void {
            this.bsModalRef = this._modalService.show(InsertClientModalComponent);
            this.bsModalRef.content.isClientInserted.subscribe((isInserted : boolean)=>{
              if(isInserted){
                this._toastrService.success("Client created Successfully.");
                this.getAllClients();
                this._modalService.hide();
              }else{
                 this._toastrService.error("Error! Unable to Save the Client.")
              }
            })
         
          }

          openDeleteSingleClientModal(clientId : number){
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
            this._toastrService.info("Client Delete cancelled");
          })
          }

          redirectToUpdateClientPage(clientId : number): void {
           this._router.navigate(["/user/client-update", clientId]);
          }

          
    


    /* Sorting clients---- */
    sortClient(sortRequest : SortRequest) : void {
      this.getAllClients(undefined, undefined, sortRequest.getSortBy(), sortRequest.getDirection());
    }





/* PAGINATION------------------------------------------ */    
    toSpecificPage( url : string):void{
      this._clientService.getRequiredPage(url).subscribe({
        next : (response : ApiResponseModelPaginated<ClientResponse>)=>{
          console.log("Returning the selected paginated page first,last,next,prev page.");
        },
        error : (error) =>{
          console.log("Error forwarding to the selected paginated request page.", error)
        },
        complete : ()=>{
          console.log("Completed");
        }
      })
    }


     /* New Content size emitted from the app-pagination */     
     emittedContentSize(contentSize : number) : void{
      this.getAllClients(1,contentSize,undefined,undefined);
    }      


  
     getAllClients(pageNumber?:number, pageSize?: number,
        sortBy?: string, direction?: string ) : void {
    
        this._clientService.getAllClients(pageNumber, pageSize, sortBy, direction).subscribe({
          next : (response: ApiResponseModelPaginated<ClientResponse>) => {
            this.clientList = response.data.content;
            //saving the list of (next, previous, last, first) page links in a variable.
            this.pageLinks = response.data.links; 
            this.isLoading = false;
            console.log("This is of the demo client Table" , response.data);
          },
          error : (error)=> {
            console.log("Error occured while getting all the clients.", error);
            this.isLoading = true;
          },
          complete : () => { console.log("All client obtained Successfully.")}
        })
      }





      searchClients(searchRequest: SearchRequest ){
      this.isLoading = true
      this._clientService.searchQuery(searchRequest).subscribe({
        next : (response : ApiResponseModelPaginated<ClientResponse>)=>{
          this.clientList = response.data.content;
          this.isLoading = false;
          console.log(this.clientList);
          // this.isSearchResultPresent = true;
          this.tableUi.isSearchResultPresent = true; //to show no content found in table-UI-component.
          this.accordianUi.isSearchResultPresent = true;
          // this._toastrService.success("Search Complete.")
        },
        error : error => {
          if(error.status===404){
            this.tableUi.isSearchResultPresent = false; //to show no content found in table-UI-component.
            this.accordianUi.isSearchResultPresent = false;
            // this.isSearchResultPresent = false;
          }else if( error.status ===500){
            this._router.navigate(["/error/500"]);
          }
          this.isLoading = false;
        },
        complete : ()=>{
          console.log("Search done successfully.")
        }
      })
    }



    deleteMultipleClients(idList :number[]) : void {
      this.selectedClients.idList=idList;
      this._clientService.deleteMultipleClients(this.selectedClients).subscribe({
        next : (response : ApiResponseModel<string>)=>{
          console.log("Multiple clients deleted");
          this._toastrService.success("Multiple clients deleted successfully.");
        },
        error: (error)=>{
          console.log("Unable to delete multiple clients", error);
          this._toastrService.warning("Failed to delete multiple clients");
        }
      })
    }




}
