import { Component, ViewChild } from '@angular/core';
import { MaterialModules } from '../../material';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-main-layout',
  imports: [MaterialModules, SideBarComponent, RouterOutlet, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
}
