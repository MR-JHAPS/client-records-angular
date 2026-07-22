import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animateOnScroll/animate-on-scroll.directive';

@Component({
  selector: 'app-about-me',
  imports: [AnimateOnScrollDirective],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

}
