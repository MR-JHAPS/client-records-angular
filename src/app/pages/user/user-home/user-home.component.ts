import { Component, inject, OnInit } from '@angular/core';
import { ClientDto } from '../../../core/models/clientDto';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';

@Component({
  selector: 'app-user-home',
  imports: [],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  _clientService : ClientApiServiceService = inject(ClientApiServiceService);
  clientList : Array<ClientDto> = [];


  ngOnInit(): void {
    this.getAllClients(0,20);
  }



  getAllClients(page: number, size: number):void {
    this._clientService.getAllClients().subscribe({
      next: (apiResponseClient) => {
        console.log(apiResponseClient.data.content); // Debugging the full API response
        this.clientList = apiResponseClient.data.content.clientList;
        
        
        // console.log(this.clientList, "client list"); // Check if data is being populated
      },
      error: (error) => {
        console.error("Error while getting all the clients:",error );
      },
      complete: () => {
        console.log("Fetching the list of clients completed successfully.");
      }

  });
  

  }







  
}//ends class
