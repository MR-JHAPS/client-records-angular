import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationStatusService {


  isEmailVerified : BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  isEmailVerified$ = this.isEmailVerified.asObservable();


  setEmailVerified():void{
    this.isEmailVerified.next(true);
  }

  setEmailNotVerified(): void{
    this.isEmailVerified.next(false);
  }




}//ends service class.
