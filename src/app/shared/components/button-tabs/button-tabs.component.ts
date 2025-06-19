import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonTabs } from '../../../core/models/uiModal/buttonTabs';

@Component({
  selector: 'app-button-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './button-tabs.component.html',
  styleUrl: './button-tabs.component.css'
})
export class ButtonTabsComponent {

  @Input() buttonTabsChild : ButtonTabs[] ;




}
