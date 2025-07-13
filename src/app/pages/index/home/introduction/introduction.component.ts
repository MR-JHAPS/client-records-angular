import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animateOnScroll/animate-on-scroll.directive';

@Component({
  selector: 'app-introduction',
  imports: [AnimateOnScrollDirective],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {

}
