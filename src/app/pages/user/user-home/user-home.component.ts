import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
import { SubMenuComponent } from "../../../layout/sub-menu/sub-menu.component";
// import { UserMenuCommunicationService } from '../../../shared/services/userMenuCommunication/user-menu-communication.service';

@Component({
  selector: 'app-user-home',
  imports: [RouterOutlet, ClientTableComponent, SubMenuComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent   {




}//ends class
