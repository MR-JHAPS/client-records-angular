import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { ButtonTabsComponent } from "../../shared/components/button-tabs/button-tabs.component";
import { ButtonTabs } from '../../core/models/uiModal/buttonTabs';

@Component({
  selector: 'app-index-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, ButtonTabsComponent],
  templateUrl: './index-layout.component.html',
  styleUrl: './index-layout.component.css'
})
export class IndexLayoutComponent {

    buttonTabs : ButtonTabs[] = [
                                new ButtonTabs("My Portfolio", "/home"),
                                new ButtonTabs( "My Project", "/projectDetails")
                              ];
    isSubMenuVisible : boolean = false;










}
