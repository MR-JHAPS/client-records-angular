import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './authentication-layout.component.html',
  styleUrl: './authentication-layout.component.css'
})
export class AuthenticationLayoutComponent {

}
