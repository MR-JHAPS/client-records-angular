import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMenuCommunicationService {

  
  isMenuSideBarOpen = new BehaviorSubject<boolean>(false);
  isMenuSideBarOpen$ = this.isMenuSideBarOpen.asObservable();



  openMenuSideBar(){
    console.log("Communication service set true");
    this.isMenuSideBarOpen.next(true);
  }

  closeMenuSideBar(){
    this.isMenuSideBarOpen.next(false);
  }

  toggleMenuSideBar(){
    this.isMenuSideBarOpen.next(!this.isMenuSideBarOpen.value);
  }


}
