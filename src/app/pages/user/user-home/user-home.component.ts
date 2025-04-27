import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
// import { UserMenuCommunicationService } from '../../../shared/services/userMenuCommunication/user-menu-communication.service';

@Component({
  selector: 'app-user-home',
  imports: [RouterOutlet, ClientTableComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent   {




}//ends class
