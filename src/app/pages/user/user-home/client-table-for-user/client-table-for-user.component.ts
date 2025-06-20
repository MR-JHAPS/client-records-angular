import { Component, inject, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-client-table-for-user',
  imports: [TableUIComponent, SearchUiComponent],
  templateUrl: './client-table-for-user.component.html',
  styleUrl: './client-table-for-user.component.css'
})
export class ClientTableForUserComponent {


    @ViewChild(TableUIComponent) tableUi !: TableUIComponent;

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
      isMobile = false; // this stores if the viewing device is mobile/laptop.
      isLoading = true;
      isSearchResultPresent = true; // this is to see if the searching contains no clients.
    
      isSortClicked = true;
      isSortIdVisible = false;
      isSortFirstNameVisible = false;
      isSortLastNameVisible = false;
      isSortDOBVisible = false;
      isSortPostalCodeVisible = false;
  
  
  
      tableColumns : TableDataModel[] = [
        { header: 'ID', contentKey: 'id' },
        { header: 'First Name', contentKey: 'firstName' },
        { header: 'Last Name', contentKey: 'lastName' },
        { header: 'Date of Birth', contentKey: 'dateOfBirth', isDate: true },
        { header: 'Postal Code', contentKey: 'postalCode' }
      ]
      

      searchFields : SearchDataModel[] = [
            new SearchDataModel("Any", "searchQuery"),
            new SearchDataModel("First Name", "firstName"),
            new SearchDataModel("Last Name", "lastName"),
            new SearchDataModel("Postal Code", "postalCode")
      ]
    
      ngOnInit(): void {
        this.getAllClients();
        this.pageLinks;
        
    
        /* suscribing to the communicationService behaviour subj to see if client is updated and display alert accordingly.*/
        // this.updateSubscription = this._communicationService.isClientUpdated$.subscribe(
        //   (isUpdated: boolean) => {
        //     if (isUpdated) {
        //       this._toastrService.success("Client updated successfully");
        //     }
        //   }
        // );
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
          // this._toastrService.success("Search Complete.")
        },
        error : error => {
          if(error.status===404){
            this.tableUi.isSearchResultPresent = false; //to show no content found in table-UI-component.
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





}
