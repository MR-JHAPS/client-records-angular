import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { timeout } from 'rxjs';
import { ClientResponse } from '../../../core/models/response/clientResponse';
import { ClientRequest } from '../../../core/models/request/clientRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';

@Component({
  selector: 'app-client-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent implements OnInit{

  private _clientService = inject(ClientApiServiceService);
  private _activatedRoute = inject(ActivatedRoute);

  public id: number ; //id is passed from  getIdFromURL() which is initialized in ngOnInit so it loads when page loads. 
  public client : ClientRequest = new ClientRequest();  

  public isUpdated:boolean = false;
  public hasError: boolean = false;
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
    const optionalParam = this._activatedRoute.snapshot.queryParamMap.get("id");
    if(optionalParam!=null){
      this.id = parseInt(optionalParam); 
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


  /* Updating Client */
  updateClient(id:number, client: ClientRequest){
    console.log(client);
      this._clientService.updateClients(id, client).subscribe({
      next : (response : ApiResponseModel<string> )=>{
        console.log(response)
        this.isUpdated=true;
        this.message= response.message;
      },
      error : (error) => {
        console.log("error udpating the client : ", error);
        this.hasError = true;
        this.message = "Error! unable to Update Client";
      }
    })
  }


  OnUpdateClick(){
    this.updateClient(this.id, this.client);
  }

  

  closeMessage(){
    this.hasError = false;
    this.isUpdated = false;
  }




  

}//ends class
