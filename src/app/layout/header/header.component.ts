import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MaterialModules } from '../../material';
import { AuthServiceService } from '../../core/auth/services/auth-service.service';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MaterialModules, NgIf, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

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




  @Output() menuToggle = new EventEmitter<void>();




  logout(){
    this._authService.loggedOut();
  }
}
