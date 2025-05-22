import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleUpdatedCommunicationService {

  roleUpdated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  roleUpdated$ = this.roleUpdated.asObservable();



  updateRoleAsUpdated(){
    console.log("received the status of role updated in communicationService.");
    this.roleUpdated.next(true);
  }




}
