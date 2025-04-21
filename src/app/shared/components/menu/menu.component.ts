import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/auth/services/auth-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { filter, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgIf, CommonModule, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {

  private _authService = inject(AuthServiceService);
  private _router = inject(Router);
  private routerSub!: Subscription;
   isRoleUser$ = this._authService.isRoleUser$
   isRoleAdmin$ = this._authService.isRoleAdmin$;

  ngOnInit(): void {
    this._authService.initializeAuthState();

    this.routerSub =  this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Force menu refresh on route change (including back button)
      this._authService.initializeAuthState(); 
    });
  }

  // isCollapsed = false;





/* default is false. public menu is displayed.
  if user has logged in and is true then user menu is shown.
  This variable is called in menu.component.html
   in *ngIf condition */
/*   _isLoggedIn! : Observable<boolean>;  */ 
  


  logOut(){
    this._authService.loggedOut(); 
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe(); // Prevent memory leaks
  }


}//ends class
