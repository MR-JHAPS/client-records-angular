import { AfterViewInit, Component, ElementRef, inject, NgModule, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ClientDto } from '../../../core/models/clientDto';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ApiLinksModel} from '../../../core/models/apiLinksModel';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PaginationServiceService } from '../../../core/services/paginationService/pagination-service.service';
import { ApiPageModel } from '../../../core/models/class/apiPageModel';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { ClientUpdateComponent } from '../client-update/client-update.component';

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, CommonModule, RouterLink, ClientUpdateComponent, NgIf],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit, AfterViewInit {
 
  @ViewChild('clientUpdateComponent') clientUpdateComponent: ClientUpdateComponent;
  updateTemplate : ElementRef<any>;

  private _modalService = inject(ModalServiceService);
  private _clientService : ClientApiServiceService = inject(ClientApiServiceService);
  private _paginationService: PaginationServiceService = inject(PaginationServiceService);
  private linkList : Array<ApiLinksModel> = [];  //this holds the list of pagination      ----links[{rel,href},{rel,href}].
  private mappedLinks = new Map<string, string>;// this holds the key pair value of Extracted linkList ----links{rel:href, rel:href}.
  // private pageModel : ApiPageModel = new ApiPageModel(); 

  public searchQuery : string = "";  //this stores the search query.
  public clientList : Array<ClientDto> = []; // this stores the Array of clients obtained from Api.
  public pageNumber:number = 0;
  public clientContentPerPage = 10 ; // hold the number of client-content per page.


  //initializer for this component.
  ngOnInit(): void {
    this.getAllClients(this.clientContentPerPage, undefined);
    this.gettingClientsPerPage();
  }

  ngAfterViewInit(): void {
    this.updateTemplate = this.clientUpdateComponent.getUpdateModal();
  }

//----------------------------ON UPDATE BUTTON CLICK--------------------------------------------------------------------------------------
openModal():void{
  this._modalService.openModal();
}

closeModal(): void{
  this._modalService.closeModal();
}





//----------------------------------------------------------------------------------------------------------------------
  getAllClients(size?: number, url?: string) : void {
    this._clientService.getAllClients(size, url).subscribe({
      next: (apiResponseClient) => {
        console.log(apiResponseClient.data);
        this.clientList = apiResponseClient.data.content; 
        this.linkList = apiResponseClient.data.links; //putting the List of all the pagination links  
        this.mappedLinks = this._paginationService.convertingToHashMap(this.linkList); //converting to List of Map<key,value>.
        console.log("links are : " + this._paginationService.convertingToHashMap(this.linkList));
        // console.log("This is the link for the last page : " +this.extractingEachLinks("last"));
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

 /*Live changes of contents per page as selected by user*/ 
settingContentsPerPage(event:Event):void{
  // console.log("this is the value of this.toCurrentPage() method : " + this.toCurrentPage());
 /*  const currentUrl = this.extractingEachLinks("self");
  console.log(currentUrl + " : : THis is the current Url"); */
 // const urlWithUpdatedSize = this._paginationService.setNewPageSizeByUrl(this.clientContentPerPage, currentUrl);
  this.getAllClients(this.clientContentPerPage);
  
}

/*
  This method is to generate the number from 10 to 50 
  that represents/displays in [Select->Option] no of client contents per page
*/
gettingClientsPerPage():Array<number>{
  const noOfContents: Array<number> = [];
  for(let i=10; i<=50; i+=5){
      noOfContents.push(i);
  }
  return noOfContents;
}

//----------------------------------------------------------------------------------------------------------------------


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


//For live search will work on it later:------------------------------------------------------------------------------------

 /*  liveSearchClientsWithQuery(event:Event) : void{
    this._clientService.searchQuery(this.searchQuery).subscribe({
      next : (apiResponseClient) =>{
        this.clientList = apiResponseClient.data.content;
      },
      error : (error)=>{
        console.log("error searching client with query " ,error)
      },
      complete : () => {console.log("Searching Clients with Query Completed")}
    })
  } */

//----------------------------------------------------------------------------------------------------------------------



 /*  updateClients(){

  } */

/* 
   // Navigate to a specific page using HATEOAS links
   navigateToPage(linkKey: string): void {
    const url = this.paginationLinks[linkKey];
    if (url && url.length>0) {
      this.getAllClients(undefined, undefined, url[0]);
    }
  }

  // Helper methods for UI navigation
  nextPage(): void {
    this.navigateToPage('next');
  }

  previousPage(): void {
    this.navigateToPage('prev');
  }

  firstPage(): void {
    this.navigateToPage('first');
  }

  lastPage(): void {
    this.navigateToPage('last');
  }
 */






}//ends class
