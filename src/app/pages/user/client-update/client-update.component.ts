import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, OnInit, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { timeout } from 'rxjs';
import { ClientResponse } from '../../../core/models/response/clientResponse';
import { ClientRequest } from '../../../core/models/request/clientRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { CommunicationServiceService } from '../../../shared/services/communication-service.service';

@Component({
  selector: 'app-client-update',
  imports: [FormsModule, CommonModule, ],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent implements OnInit{

  private _clientService = inject(ClientApiServiceService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toastrService =  inject(ToastrService);
  private _communicationService = inject(CommunicationServiceService);

  // @Output() isUpdated = new EventEmitter<boolean>();
  public id: number ; //id is passed from  getIdFromURL() which is initialized in ngOnInit so it loads when page loads. 
  public client : ClientRequest = new ClientRequest();  

/*   public isUpdated:boolean = false;
  public hasError: boolean = false; */
  public message : string;


  ngOnInit(): void {
    this.getIdFromURL();
    this.getClientById(this.id);
    setTimeout(()=>{
      console.log(this.client)
    }, 1000)
    
  }

  
  /* Extracting string|null type id-value from URL and parsing it to INT */
  getIdFromURL(){
    const routeParam = this._activatedRoute.snapshot.paramMap.get("id");
    if(routeParam!=null){
      this.id = parseInt(routeParam); 
    }
    console.log("This is in number : " + this.id)
  }




  /* Getting client by id  */
  getClientById(id:number):void{
    this._clientService.getClientById(id).subscribe({
      next : (response : ApiResponseModel<ClientResponse> ) => {
          this.client = response.data;
      },
      error: (error)=>{
        console.log("error while getting client by id in Update Client Component " , error);
      }
    })
  }


  /* Updating Client : returns boolean */
  updateClient(id:number, client: ClientRequest): void{
    console.log("Updating client ");
   
      this._clientService.updateClients(id, client).subscribe({
        next : (response : ApiResponseModel<string> )=>{
          console.log(response)
          // this.isUpdated.emit(true);      // emitting output saying update is done.
          this._communicationService.clientUpdated();
          this._router.navigateByUrl("user/user-home");
      },
      error : (error) => {
        console.log("error udpating the client : ", error);
        this._toastrService.error("Error! Unable to update the Client.");
        // this.isUpdated.emit(false);
      }
    })
  }


  OnUpdateClick(){
     this.updateClient(this.id, this.client);
  }

  

/*   closeMessage(){
    this.hasError = false;
    this.isUpdated = false;
  } */




  

}//ends class
