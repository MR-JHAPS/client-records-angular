import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { MaterialModules } from './material';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, MaterialModules],
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
