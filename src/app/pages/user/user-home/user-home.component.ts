import { Component, inject, OnInit } from '@angular/core';
import { ApiModule, ApiResponseObject, ApiResponsePagedModelEntityModelClientDto, ApiResponseString, ClientControllerService, ClientDto, EntityModelClientDto, PagedModelEntityModelClientDtoEmbedded } from '../../../core/api/client-records-api';

@Component({
  selector: 'app-user-home',
  imports: [ApiModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  _clientService : ClientControllerService = inject(ClientControllerService);
  
  clientList : Array<EntityModelClientDto> = []


  ngOnInit(): void {
    this.getAllClients(0,10);
  }
  getAllClients(page: number, size: number) {
    this._clientService.getAllClients(page, size).subscribe({
      next: (response: ApiResponsePagedModelEntityModelClientDto) => {
        console.log(response); // Debugging the full API response
        
        // Extract clients from _embedded.clientDtoList
        this.clientList = response.data?._embedded?.clientDtoList || [];
        
        console.log(this.clientList, "client list"); // Check if data is being populated
      },
      error: (error) => {
        console.error("Error while getting all the clients:", error);
      },
      complete: () => {
        console.log("Fetching the list of clients completed successfully.");
      }
    });
  }
  /* getAllClients(page:0, size:10){
    
    this._clientService.getAllClients(page,size).subscribe({
      next : (response: ApiResponsePagedModelEntityModelClientDto) => {
        
        console.log(response);
      if(response?.data?._embedded?.clientDtoList && Array.isArray(response.data._embedded)){
        this.clientList = response.data._embedded as Array<EntityModelClientDto>;
        console.log("Client list:", this.clientList);
      }else{
        console.error('Invalid data format: Expected an array inside data.content, but got:', response?.data);
      
      }
      },
      
      error : (error) => {
        console.log("error while getting all the clients" + error)
      },
      complete : () => {console.log("getting the list of clients done successfully.")}
    })
  }
 */


}//ends class
