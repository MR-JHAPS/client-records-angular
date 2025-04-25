import { Component, ViewChild } from '@angular/core';
import { MaterialModules } from '../../../material';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  imports: [ MaterialModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

}
