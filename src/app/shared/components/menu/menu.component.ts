import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../../core/auth/services/auth-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { filter, map, Observable, shareReplay, Subscription } from 'rxjs';
import { UserMenuCommunicationService } from '../../services/userMenuCommunication/user-menu-communication.service';
import { MaterialModules } from '../../../material';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-menu',
  imports: [RouterLink, NgIf, CommonModule, RouterLinkActive, MaterialModules, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  private _authService = inject(AuthServiceService);
  private _router = inject(Router);
  private _userMenuCommService = inject(UserMenuCommunicationService);
  private routerSub!: Subscription;
   isRoleUser$ = this._authService.isRoleUser$
   isRoleAdmin$ = this._authService.isRoleAdmin$;

   showMobileMenu = false;
   @ViewChild('mobileMenu') mobileMenu!: MatSidenav;

  ngOnInit(): void {
    this._authService.initializeAuthState();

    this.routerSub =  this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Force menu refresh on route change (including back button)
      this._authService.initializeAuthState(); 
    });
  }

  toggleMenu() {
    this.mobileMenu.toggle();
  }


  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



    /* openSideBar(){
      console.log("button on menu component clicked.")
      this._userMenuCommService.openMenuSideBar();
    } */

   /*  toggleSideBar(){
      console.log("button on menu component clicked.")
      this._userMenuCommService.toggleMenuSideBar();
    }


    toggleMobileMenu(){
      this.showMobileMenu = !this.showMobileMenu;
    } */




/* default is false. public menu is displayed.
  if user has logged in and is true then user menu is shown.
  This variable is called in menu.component.html
   in *ngIf condition */
/*   _isLoggedIn! : Observable<boolean>;  */ 
  


  logOut(){
    this._authService.loggedOut(); 
  }
/* 
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe(); // Prevent memory leaks
  }
 */

}//ends class
