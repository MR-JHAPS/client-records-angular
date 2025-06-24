import { Component, Input } from '@angular/core';
import { NoImageDirective } from '../../directives/noImageDirective/no-image.directive';

@Component({
  selector: 'app-avatar-img',
  imports: [NoImageDirective],
  templateUrl: './avatar-img.component.html',
  styleUrl: './avatar-img.component.css'
})
export class AvatarImgComponent {

  @Input() avatarImageUrl : string = "";





}
