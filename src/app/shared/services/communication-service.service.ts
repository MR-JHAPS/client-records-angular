import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {

  isClientUpdated = new BehaviorSubject<boolean>(false);
  isClientUpdated$ = this.isClientUpdated.asObservable();



  clientUpdated(){
    this.isClientUpdated.next(true);
  }
  





}
