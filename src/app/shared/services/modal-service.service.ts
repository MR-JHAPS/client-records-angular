import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientDto, I_ClientDto } from '../../core/models/clientDto';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {


private client = new BehaviorSubject<ClientDto>(new ClientDto());
client$ = this.client.asObservable();

setClient(client :ClientDto){
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
