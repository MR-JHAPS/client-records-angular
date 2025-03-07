import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  
  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();


 loggedIn(){
  this.isLoggedIn.next(true) ;
 }

 loggedOut(){
  this.isLoggedIn.next(false);
 }



}//ends class
