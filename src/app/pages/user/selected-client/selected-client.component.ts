import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { ClientDto, I_ClientDto } from '../../../core/models/clientDto';

@Component({
  selector: 'app-selected-client',
  imports: [],
  templateUrl: './selected-client.component.html',
  styleUrl: './selected-client.component.css'
})
export class SelectedClientComponent implements AfterViewInit, OnInit {



  @ViewChild("selectedClientModal") selectedClientModal : ElementRef; // getting the element reference from the html.
  private modalObj !: Modal; // this is the Class of Bootstrap. We are creating an instance of that.


  private _modalservice = inject(ModalServiceService);
  public client : ClientDto = this._modalservice.getClient();

  ngOnInit(): void {
    console.log("OnInit of the Seleceted-Client-Component this is inside the selected client component : ",this.client)
  }

  ngAfterViewInit(): void {
    this.modalObj = new Modal(this.selectedClientModal.nativeElement); //the elementRef is then assigned to the new Modal Class.    
  }

  getClientData(): void {
    setTimeout(()=>{ this.client = this._modalservice.getClient(); // Retrieves the current client data
      console.log("Delayed : " , this.client)},
    200);
    // this.client = this._modalservice.getClient(); // Retrieves the current client data
    //   console.log("Delayed : ",this.client)
   
  }

  openSelectedClient() {
    this.modalObj.show(); // this is the function of Modal Class from Bootstrap.
    this.getClientData();
   
  }

  closeSelectedClient(){
    this.modalObj.hide(); // this is the function of Modal Class from Bootstrap.
  }



}
