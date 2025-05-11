import { Component, ViewChild } from '@angular/core';
import { MaterialModules } from '../../../material';
import { MatSidenav } from '@angular/material/sidenav';
import { AnimateOnScrollDirective } from '../../../shared/directives/animateOnScroll/animate-on-scroll.directive';

@Component({
  selector: 'app-home',
  imports: [ MaterialModules,AnimateOnScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

}
