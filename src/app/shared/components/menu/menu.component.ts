import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/services/AuthService/auth-service.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private _authService = inject(AuthServiceService);
  private _router = inject(Router);

/* default is false. public menu is displayed.
  if user has logged in and is true then user menu is shown.
  This variable is called in menu.component.html
   in *ngIf condition */
  _isLoggedIn  = this._authService.isLoggedIn$;  


  logOut(){
    const user = localStorage.getItem("loggedInUser");
    console.log(user);
    user?localStorage.removeItem(user):null;
    this._router.navigateByUrl("home");
    this._authService.loggedOut(); //calling the logout function of authService to change the menu contents.
  }






}//ends class
