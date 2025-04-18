import { ApplicationModule, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
@Component({
  selector: 'app-check',
  imports: [RouterLink, ApplicationModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css'
})
export class CheckComponent {

}
