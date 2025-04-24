import { Component, ElementRef, inject, OnDestroy, OnInit, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SelectedClientComponent } from "../selected-client/selected-client.component";
import { ClientTableComponent } from "../../../shared/components/tables/client-table/client-table.component";
import { ApiLinksDetails } from '../../../core/models/responseModel/apiLinksDetails';
import { UserMenuCommunicationService } from '../../../shared/services/userMenuCommunication/user-menu-communication.service';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-user-home',
  imports: [FormsModule, CommonModule,RouterOutlet, RouterLink, ClientTableComponent, 
    NgIf, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatListModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})

export class UserHomeComponent implements OnInit, OnDestroy  {

  
  private _router = inject(Router);
  private linkList : Array<ApiLinksDetails> = [];  //this holds the list of pagination      ----links[{rel,href},{rel,href}].
  private mappedLinks = new Map<string, string>;// this holds the key pair value of Extracted linkList ----links{rel:href, rel:href}.
  private menuSubscription : Subscription;
  private _userMenuCommService = inject(UserMenuCommunicationService);
  isMenuSideBarOpen$ : Observable<boolean> = this._userMenuCommService.isMenuSideBarOpen$;

  @ViewChild("drawer") drawer!: MatDrawer; 
  


  ngOnInit(): void {
    this.menuSubscription = this._userMenuCommService.isMenuSideBarOpen$.subscribe(
      (isOpen)=> {
        if(isOpen){
        this.drawer.open();
        }else{
          this.drawer.close();
        }
      } 
      
    ) // Adjust time as needed
  }


  closeSideBar(){
    this._userMenuCommService.closeMenuSideBar();
  }

  toClientLog(){
    console.log("navigating to clientLogTable.")
    this._router.navigateByUrl("user/clientLogTable");
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }


  

  toggleSideBar(){
    this.drawer.toggle();
  }




}//ends class
