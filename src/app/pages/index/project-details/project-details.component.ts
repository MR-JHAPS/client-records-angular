import { Component } from '@angular/core';
import { ButtonTabsComponent } from "../../../shared/components/button-tabs/button-tabs.component";
import { ButtonTabs } from '../../../core/models/uiModal/buttonTabs';

@Component({
  selector: 'app-project-details',
  imports: [ButtonTabsComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {


      buttonTabs : ButtonTabs[] = [
                                new ButtonTabs("My Portfolio", "/home"),
                                new ButtonTabs( "My Project", "/projectDetails")
                              ];

}
