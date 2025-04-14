import { AfterViewInit, Component, ElementRef, inject, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ClientDto, I_ClientDto } from '../../../core/models/clientDto';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ApiLinksModel} from '../../../core/api/models/response/responseModel/apiLinksDetails';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PaginationServiceService } from '../../../core/services/paginationService/pagination-service.service';
import { ApiPageModel } from '../../../core/models/class/apiPageModel';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { ApiResponseClient } from '../../../core/models/apiResponseClient';
import { SelectedClientComponent } from "../selected-client/selected-client.component";

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, CommonModule, RouterLink, ClientUpdateComponent, NgIf, SelectedClientComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent implements OnInit, AfterViewInit {

  
 //this is to implement the update-client template from "ClientUpdateComponent".
  @ViewChild("selectedClientComponent") selectedClientComponent : SelectedClientComponent;
  selectedClientDiv : ElementRef<any>;

  updateTemplate : ElementRef<any>;
 
  private _router = inject(Router);
  private _modalService = inject(ModalServiceService);
  private _clientService : ClientApiServiceService = inject(ClientApiServiceService);
  private _paginationService: PaginationServiceService = inject(PaginationServiceService);
  private linkList : Array<ApiLinksModel> = [];  //this holds the list of pagination      ----links[{rel,href},{rel,href}].
  private mappedLinks = new Map<string, string>;// this holds the key pair value of Extracted linkList ----links{rel:href, rel:href}.
  // private pageModel : ApiPageModel = new ApiPageModel(); 

  public searchQuery : string = "";  //this stores the search query.
  public clientList : Array<I_ClientDto> = []; // this stores the Array of clients obtained from Api.


  public pageNumber:number = 0;
  public clientContentPerPage = 10 ; // hold the number of client-content per page.


  //initializer for this component.
  ngOnInit(): void {
    this.getAllClients(this.clientContentPerPage, undefined);
    this.gettingClientsPerPage();
    // console.log("before Click of client Update: " + this.client);
  }

  ngAfterViewInit(): void {
    this.selectedClientDiv = this.selectedClientComponent.selectedClientModal;
  }

  //Selected CLient click:------------------------------------------------------------------------------- 

  getClientById(id: number): void{
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
  }



  openSelectedClient(id:number){
    this.getClientById(id);
    this._modalService.getClient(); // when li of client is clicked modal is triggered
    console.log(this._modalService.getClient());
    this.selectedClientComponent.openSelectedClient(); 
  }








  //----------------------------ON UPDATE BUTTON CLICK--------------------------------------------------------------------------------------
  navigateToUpdatePage(id:number){
    this._router.navigate(["/client-update"], {queryParams:{id : id} } )
  }

  //----------------------------------------------------------------------------------------------------------------------
    getAllClients(size?: number, url?: string) : void {
      this._clientService.getAllClients(size, url).subscribe({
        next: (response:ApiResponseClient) => {
          console.log(response.data);
          this.clientList = response.data.content; 
          console.log(this.clientList);
          this.linkList = response.data.links; //putting the List of all the pagination links  
          this.mappedLinks = this._paginationService.convertingToHashMap(this.linkList); //converting to List of Map<key,value>.
          console.log("links are : " + this._paginationService.convertingToHashMap(this.linkList));
        },
        error: (error) => {
          console.error("Error while getting all the clients:",error );
        },
        complete: () => {
          console.log("Fetching the list of clients completed successfully.");
        }
      });
    }

  //---------------------------------------------------------------------------------------------------------------------- 
  //getting value from mapped list of Pagination links.
  extractingEachLinks(key:string): string|undefined{
    return this.mappedLinks.get(key); 
  }

  toLastPage(){
    let selectedUrl = this.extractingEachLinks("last");
    this.getAllClients(this.clientContentPerPage, selectedUrl);
  }

  toFirstPage(){
    let selectedUrl = this.extractingEachLinks("first");
    this.getAllClients(this.clientContentPerPage, selectedUrl);
  }

  toNextPage(){
    let selectedUrl = this.extractingEachLinks("next");
    this.getAllClients(this.clientContentPerPage, selectedUrl);
  }

  toPreviousPage(){
    let currentUrl = this.extractingEachLinks("self");
    console.log(currentUrl);
  }

  toCurrentPage():string|undefined{
    return this.extractingEachLinks("self");
    // return currentUrl;
  }

  //------------------THIS IS FOR THE NUMBER OF CONTENTS PER PAGE-------------------------------------------------------------------------------------- 

    /*
      This method is to generate the number from 10 to 50 in HTML
      that represents/displays in [Select->Option] no of client contents per page
    */
  gettingClientsPerPage():Array<number>{
    const noOfContents: Array<number> = [];
    for(let i=10; i<=50; i+=5){
        noOfContents.push(i);
    }
    return noOfContents;
  }

  /*Live changes of contents per page as selected by user*/ 
  settingContentsPerPage(event:Event):void{
    this.getAllClients(this.clientContentPerPage); // url is optional and handled well in "client-api-services"
    
  }

  //-------------SEARCHING CLIENTS---------------------------------------------------------------------------------------------------------

    searchClientsWithQuery() : void{
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







}//ends class
