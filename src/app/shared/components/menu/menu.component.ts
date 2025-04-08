import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/services/AuthService/auth-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  private _authService = inject(AuthServiceService);

  ngOnInit(): void {
   this._isLoggedIn = this._authService.isLoggedIn$;
    // this._authService;
    console.log("menu component initiated")
    console.log("is Logged In Status : " + this._isLoggedIn);
  }

  // private _authService = inject(AuthServiceService);
  private _router = inject(Router);

  @ViewChild("navBarCollapse") navBarCollapse !: ElementRef;


/* default is false. public menu is displayed.
  if user has logged in and is true then user menu is shown.
  This variable is called in menu.component.html
   in *ngIf condition */
  _isLoggedIn! : Observable<boolean>;  
  


  logOut(){
    const user = localStorage.getItem("loggedInUser");
    console.log(user);
    user?localStorage.removeItem(user):null;
    localStorage.removeItem("loggedInUser");
    this._router.navigateByUrl("home");
    this._authService.loggedOut(); //calling the logout function of authService to change the menu contents.
   
  }


  closeNavBar(){
    const navBar =this.navBarCollapse.nativeElement;
    navBar.classList.remove("show");
  }

 /*  navigateAndClose(route: string) {
    this._router.navigate([route]);
    this.closeNavBar();
  } */




}//ends class
