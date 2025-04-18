import { AfterViewInit, Component, ElementRef, inject, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ApiLinksDetails} from '../../../core/api/models/response/responseModel/apiLinksDetails';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { SelectedClientComponent } from "../selected-client/selected-client.component";
import { ClientResponse } from '../../../core/api/models/response/clientResponse';
import { ApiResponseModelPaginated } from '../../../core/api/models/response/responseModel/apiResponseModelPaginated';
import { ClientTableComponent } from "../../../shared/components/clientTable/client-table/client-table.component";

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, CommonModule, RouterLink, ClientUpdateComponent, NgIf, SelectedClientComponent, ClientTableComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent  {

  
 //this is to implement the update-client template from "ClientUpdateComponent".
  @ViewChild("selectedClientComponent") selectedClientComponent : SelectedClientComponent;
  selectedClientDiv : ElementRef<any>;

  updateTemplate : ElementRef<any>;
 
  private _router = inject(Router);
  private _modalService = inject(ModalServiceService);
  private linkList : Array<ApiLinksDetails> = [];  //this holds the list of pagination      ----links[{rel,href},{rel,href}].
  private mappedLinks = new Map<string, string>;// this holds the key pair value of Extracted linkList ----links{rel:href, rel:href}.
  // private pageModel : ApiPageModel = new ApiPageModel(); 

  // public searchQuery : string = "";  //this stores the search query.
  // public clientList : Array<ClientResponse> = []; // this stores the Array of clients obtained from Api.


  // public pageNumber:number = 0;
  // public clientContentPerPage = 10 ; // hold the number of client-content per page.


  //initializer for this component.
  // ngOnInit(): void {
    /* this.getAllClients(this.clientContentPerPage, undefined);
    this.gettingClientsPerPage();
    // console.log("before Click of client Update: " + this.client); */
  // }

  // ngAfterViewInit(): void {
  //   this.selectedClientDiv = this.selectedClientComponent.selectedClientModal;
  // }

  //Selected CLient click:------------------------------------------------------------------------------- 

/*   getClientById(id: number): void{
    this._clientService.getClientById(id).subscribe({
      next: (ApiResponseSingleClient) =>{
        console.log("checking if the api contains the client from given id in user Homepage" , ApiResponseSingleClient.data);
        // this.client = ApiResponseSingleClient.data;
        this._modalService.setClient(ApiResponseSingleClient.data);
        console.log("Selected client is sent to ModalService from UserHome " , ApiResponseSingleClient.data);
        
      },
      error : (error) =>{
        console.log("error getting the client by id : " ,error);
      }
    })
  } */



/*   openSelectedClient(id:number){
    this.getClientById(id);
    this._modalService.getClient(); // when li of client is clicked modal is triggered
    console.log(this._modalService.getClient());
    this.selectedClientComponent.openSelectedClient(); 
  } */








  //----------------------------ON UPDATE BUTTON CLICK--------------------------------------------------------------------------------------
  /* navigateToUpdatePage(id:number){
    this._router.navigate(["/client-update"], {queryParams:{id : id} } )
  } */

  //-------------SEARCHING CLIENTS---------------------------------------------------------------------------------------------------------

  /*   searchClientsWithQuery() : void{
      this._clientService.searchQuery(this.searchQuery).subscribe({
        next : (apiResponseClient) =>{
          this.clientList = apiResponseClient.data.content;
        },
        error : (error)=>{
          console.log("error searching client with query " ,error)
        },
        complete : () => {console.log("Searching Clients with Query Completed")}
      })
    }
 */






}//ends class
