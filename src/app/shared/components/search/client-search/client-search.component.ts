import { Component, inject } from '@angular/core';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';

@Component({
  selector: 'app-client-search',
  imports: [],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.css'
})
export class ClientSearchComponent {

  private _clientService = inject(ClientApiServiceService)





}
