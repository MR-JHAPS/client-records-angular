import { Component, inject } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-verify-email-modal',
  imports: [],
  templateUrl: './verify-email-modal.component.html',
  styleUrl: './verify-email-modal.component.css'
})
export class VerifyEmailModalComponent {


  _modalService = inject(BsModalService);


sendEmailVerification():void{

  

}






}
