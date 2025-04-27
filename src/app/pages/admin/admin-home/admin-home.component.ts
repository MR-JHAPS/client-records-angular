import { Component } from '@angular/core';
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [ClientTableComponent, RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
