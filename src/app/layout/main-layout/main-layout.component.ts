import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModules } from '../../material';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AuthServiceService } from '../../core/auth/services/auth-service.service';
import { filter, Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { SubMenuComponent } from "../sub-menu/sub-menu.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  imports: [MaterialModules, RouterOutlet, HeaderComponent, NgIf, CommonModule, SubMenuComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {

  // @ViewChild('sidenav') sidenav!: MatSidenav;

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





}
