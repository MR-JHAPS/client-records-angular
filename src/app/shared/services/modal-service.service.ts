import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientRequest } from '../../core/models/request/clientRequest';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {


private client = new BehaviorSubject<ClientRequest>(new ClientRequest());
client$ = this.client.asObservable();

setClient(client :ClientRequest){
  this.client.next(client);
}

getClient(){
  return this.client.getValue();
}






 private isModalOpen : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 isModalOpen$ = this.isModalOpen.asObservable(); //what does this $ does??


 openModal():void{
    this.isModalOpen.next(true); // beacause for behaviour subject BS_variable.next("new value");
    // this.isModalOpen$=true;
 }

 closeModal():void{
  this.isModalOpen.next(false);
 }



  /* constructor() { } */
}
