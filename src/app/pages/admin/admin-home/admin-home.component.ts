import { Component } from '@angular/core';
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
import { RouterOutlet } from '@angular/router';
import { SubMenuComponent } from "../../../layout/sub-menu/sub-menu.component";

@Component({
  selector: 'app-admin-home',
  imports: [ClientTableComponent, RouterOutlet, SubMenuComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
