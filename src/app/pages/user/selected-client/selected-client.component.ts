import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { ModalServiceService } from '../../../shared/services/modal-service.service';
import { ClientRequest } from '../../../core/api/models/request/clientRequest';

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
  public client : ClientRequest = this._modalservice.getClient();

  ngOnInit(): void {
     /* this component is child component of UserHomeComponent so when we are
        in userHome this component is already initialized */
    console.log("OnInit of the Seleceted-Client-Component this is inside the selected client component : ",this.client)
   
  }

  ngAfterViewInit(): void {
    this.modalObj = new Modal(this.selectedClientModal.nativeElement); //the elementRef is then assigned to the new Modal Class.    
  }

  getClientData(): void {
    // this.client = this._modalservice.getClient();
    setTimeout(()=>{ this.client = this._modalservice.getClient(); // Retrieves the current client data
      console.log("Delayed : " , this.client)},
    200);   
  }

  openSelectedClient() {
    this.modalObj.show(); // this is the function of Modal Class from Bootstrap.
    this.getClientData();
    console.log(this.client);
   
  }

  closeSelectedClient(){
    this.modalObj.hide(); // this is the function of Modal Class from Bootstrap.
  }



}
