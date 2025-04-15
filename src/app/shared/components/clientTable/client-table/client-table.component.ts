import { Component, inject } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ApiResponseModelPaginated } from '../../../../core/api/models/response/responseModel/apiResponseModelPaginated';
import { ApiLinksDetails } from '../../../../core/api/models/response/responseModel/apiLinksDetails';
import { ClientResponse } from '../../../../core/api/models/response/clientResponse';

@Component({
  selector: 'app-client-table',
  imports: [],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent {
  private _clientService = inject(ClientApiServiceService);

  clientList : Array<ClientResponse>;
  pageLinks : ApiLinksDetails;



  getAllClients():void{
    this._clientService.getAllClients().subscribe({
      next : (response: ApiResponseModelPaginated<ClientResponse>) => {
        this.clientList = response.data.content;
      },

      error : (error)=> {
        console.log("Error occured while getting all the clients.", error);
      },
      complete : () => { console.log("All client obtained Successfully.")}
    })



  }







}
