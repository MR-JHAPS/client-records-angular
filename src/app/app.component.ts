import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./shared/components/menu/menu.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthServiceService } from './core/auth/services/auth-service.service';
import { MaterialModules } from './material';
import { MaterialMenuComponent } from "./shared/components/menu/material/material-menu/material-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, FooterComponent, MaterialModules, MaterialMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ngOnInit(): void {
  //   this._authService;
  // }

  // private _authService = inject(AuthServiceService);
  title = 'clientRecords';
}
