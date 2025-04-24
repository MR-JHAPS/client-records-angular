import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../layout/header/header.component";
import { SideBarComponent } from "../../../layout/side-bar/side-bar.component";
import { MaterialModules } from '../../../material';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuComponent } from "../../../shared/components/menu/menu.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SideBarComponent, MaterialModules, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

}
