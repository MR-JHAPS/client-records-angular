import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-selected-image',
  imports: [NgIf],
  templateUrl: './selected-image.component.html',
  styleUrl: './selected-image.component.css'
})
export class SelectedImageComponent {

  isImageOpened : boolean = false;
  imageUrl : string = "" ;
  imageName = "";

  bsModalRef ?: BsModalRef;
  _modalService = inject(BsModalService);



closeModal(){
  this._modalService.hide();
}


}
