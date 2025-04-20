import { Component, inject, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ClientResponse } from '../../../../core/models/response/clientResponse';
import { Router } from '@angular/router';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { PaginationParams } from '../../../../core/models/request/paginationParams';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ClientSearchComponent } from "../../search/client-search/client-search.component";
import { InsertClientModalComponent } from "../../modals/insert-client-modal/insert-client-modal.component";
import { ModalService } from '../../../services/modal-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';


@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ClientSearchComponent, InsertClientModalComponent, AlertModule ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css',
  providers: [BsModalService]
})
export class ClientTableComponent implements OnInit {
 
  

  isClientInserted : boolean | null = null;

  bsModalRef?: BsModalRef;

  private _clientService = inject(ClientApiServiceService);
  private _router = inject(Router);
  private _modalService = inject(BsModalService);

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

  



/*-----------------INSERT CLIENT (MODAL)----------------------------*/

openInsertClientModal(): void {
  const initialState = {};
  this.bsModalRef = this._modalService.show(InsertClientModalComponent, { initialState });
  
  this.bsModalRef.content.clientInserted.subscribe((newClient : any) => {  
    this.handleNewClient(newClient);
  });
}

private handleNewClient(clientData: any): void {
  // Format date if needed
  if(success){
    this.isClientInserted = true;
  }else{
    this.isClientInserted = false;
  }
  if (clientData.dateOfBirth) {
    clientData.dateOfBirth = new Date(clientData.dateOfBirth);
  }
}








}
