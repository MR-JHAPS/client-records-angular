import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalServiceService } from '../../../shared/services/modal-service.service';

@Component({
  selector: 'app-client-update',
  imports: [FormsModule, CommonModule, NgIf, NgTemplateOutlet],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent {

  @ViewChild("updateModal") updateModal: ElementRef;
  private _modalService = inject(ModalServiceService);
  public isModalOpen$ = this._modalService.isModalOpen$;

  // public isModelOpen = false;

  //this is so that the other component can get this updateModal template.
  getUpdateModal(){
    return this.updateModal;
  }

  openModel(){
    /* this.isModelOpen = true; */
    this._modalService.openModal();
  }

  closeModel(){
    // this.isModelOpen = false;
    this._modalService.closeModal();
  }



}//ends class
