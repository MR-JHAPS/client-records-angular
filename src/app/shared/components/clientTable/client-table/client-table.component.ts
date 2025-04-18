import { Component, inject, OnInit } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ApiResponseModelPaginated } from '../../../../core/api/models/response/responseModel/apiResponseModelPaginated';
import { ApiLinksDetails } from '../../../../core/api/models/response/responseModel/apiLinksDetails';
import { ClientResponse } from '../../../../core/api/models/response/clientResponse';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../../core/api/models/request/paginationParams';

@Component({
  selector: 'app-client-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent implements OnInit {
  private _clientService = inject(ClientApiServiceService);
  private _router = inject(Router);
  clientList : Array<ClientResponse>;
  pageLinks : Array<ApiLinksDetails>;
  contentSize =10;
  selectedContentSize: number;


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






  // Method: Navigate to Update-Client-Page.
  navigateToUpdatePage(clientId: number):void{
    //redirects to clientUpdate page with user id.
    this._router.navigate(["user/client-update", clientId] );
  }




 /*------------------- This is for the Content Size of the page.--------------------------------------------------------------- */
  generateContentSize() : Array<number>{
    const contentSize : Array<number> = [];
    for(let i = 10; i<=40; i+=5){
      contentSize.push(i);
    }
    return contentSize;
  }

  setContentPerPage(event : Event) : void{
    this.getAllClients(0, this.contentSize);
  }


   /*------------------- This is for the Pagination.--------------------------------------------------------------- */


  toNextPage(): void {
    //passing the list of pagination Links to the service layer.
    this._clientService.getNextPage(this.pageLinks).subscribe({
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

  









}
