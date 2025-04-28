import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../../core/auth/services/auth-service.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  imports: [NgIf, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.css'
})
export class SubMenuComponent implements OnInit {

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

       this._authService.isRoleAdmin$.subscribe((a:boolean)=>{
        console.log(a);
       })
  }







}//ends class
