import { Component, ViewChild } from '@angular/core';
import { MaterialModules } from '../../../material';
import { MatSidenav } from '@angular/material/sidenav';
import { AnimateOnScrollDirective } from '../../../shared/directives/animateOnScroll/animate-on-scroll.directive';
import { ButtonTabsComponent } from "../../../shared/components/button-tabs/button-tabs.component";
import { ButtonTabs } from '../../../core/models/uiModal/buttonTabs';
import { IntroductionComponent } from "./introduction/introduction.component";
import { AboutMeComponent } from "./about-me/about-me.component";

@Component({
  selector: 'app-home',
  imports: [MaterialModules, AnimateOnScrollDirective, ButtonTabsComponent, IntroductionComponent, AboutMeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

   buttonTabs : ButtonTabs[] = [
                                new ButtonTabs("My Portfolio", "/home"),
                                new ButtonTabs( "My Project", "/projectDetails")
                              ];

}
