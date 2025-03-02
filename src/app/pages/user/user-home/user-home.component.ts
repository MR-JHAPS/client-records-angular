import { Component, inject, OnInit } from '@angular/core';
import { ClientDto } from '../../../core/models/clientDto';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ApiLinksModel} from '../../../core/models/apiLinksModel';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PaginationServiceService } from '../../../core/services/paginationService/pagination-service.service';
import { ApiPageModel } from '../../../core/models/class/apiPageModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  private _clientService : ClientApiServiceService = inject(ClientApiServiceService);
  private _paginationService: PaginationServiceService = inject(PaginationServiceService);
  private linkList : Array<ApiLinksModel> = [];  //this holds the list of pagination      ----links[{rel,href},{rel,href}].
  private mappedLinks = new Map<string, string>;// this holds the key pair value of Extracted linkList ----links{rel:href, rel:href}.
  private pageModel : ApiPageModel = new ApiPageModel(); 

  public searchQuery : string = "";  //this stores the search query.
  public clientList : Array<ClientDto> = []; // this stores the Array of clients obtained from Api.
  public pageNumber:number = 0;
  public clientContentPerPage = 10 ; // hold the number of client-content per page.


  //initializer for this component.
  ngOnInit(): void {
    this.getAllClients(0, this.clientContentPerPage);
    this.gettingClientsPerPage();
  }



  getAllClients(page?: number, size?: number, url?: string) : void {
    this._clientService.getAllClients(page, size, url).subscribe({
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

//getting value from mapped list of Pagination links.
extractingEachLinks(key:string){
  return this.mappedLinks.get(key); 
}

toLastPage(){
  let selectedUrl = this.extractingEachLinks("last");
  this.getAllClients();
}

settingContentsPerPage(event:Event):void{
 return this.getAllClients(undefined,this.clientContentPerPage, undefined);
}




/*
  This method is to generate the number from 10 to 50 
  that represents no of client contents per page
*/
gettingClientsPerPage():Array<number>{
  const noOfContents: Array<number> = [];
  for(let i=10; i<=50; i+=5){
      noOfContents.push(i);
  }
  return noOfContents;
}




/* firstPage():void{

  this.getAllClients()
}
 */
/* lastPage(key:string):void{
  const pageLink = this.links[key];
  console.log("page value : " + pageLink);
  // const pageNumber = (this.pageModel.number =  );
  const pageSize = (this.pageModel.size = 20);
  this._clientService.getAllClients(2,pageSize,pageLink)
  
} */





  //getAllClientsMethod.
/*   getAllClients(page?: number, size?: number, url?: string) : void {
    this._clientService.getAllClients(page, size, url).subscribe({
      next: (apiResponseClient) => {
        console.log(apiResponseClient.data);
        this.clientList = apiResponseClient.data.content;
        // this.linkList = apiResponseClient.data.links;
          // console.log(this.linkList);    
          this.paginationLinks = this._paginationService.extractClientLinks(apiResponseClient.data.links);
      },
      error: (error) => {
        console.error("Error while getting all the clients:",error );
      },
      complete: () => {
        console.log("Fetching the list of clients completed successfully.");
      }
    });
  } */


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



  liveSearchClientsWithQuery(event:Event) : void{
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
