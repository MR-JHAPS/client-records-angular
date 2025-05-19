import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-index-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './index-layout.component.html',
  styleUrl: './index-layout.component.css'
})
export class IndexLayoutComponent {

}
