import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSearchCommunicationService {

  isClientSearched : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isClientSearched$ = this.isClientSearched.asObservable();




  openSearchClient(){
    this.isClientSearched.next(true);
  }

  closeSearchClient(){
    this.isClientSearched.next(false);
  }













}
