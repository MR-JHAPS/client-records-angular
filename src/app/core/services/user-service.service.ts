import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private email : string = "";


  public getEmail():string{
    return this.email;
  }

  public setEmail(email:string){
    this.email = email
  }



}//ends service
