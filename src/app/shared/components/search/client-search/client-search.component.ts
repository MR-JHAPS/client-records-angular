import { Component, inject } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ClientSearchCommunicationService } from '../../../services/clientSearchCommunication/client-search-communication.service';
import { ClientRequest } from '../../../../core/models/request/clientRequest';

@Component({
  selector: 'app-client-search',
  imports: [],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.css'
})
export class ClientSearchComponent {

  private _clientService = inject(ClientApiServiceService);
  private _clientSearchCommService = inject(ClientSearchCommunicationService);
  
  clientRequest = new ClientRequest();

  searchQuery = "" ; // query to search.
  searchByField = "" ;  // field of table to search from.














}
