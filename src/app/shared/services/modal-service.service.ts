import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

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
