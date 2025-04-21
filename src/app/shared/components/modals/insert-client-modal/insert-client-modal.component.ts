
import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ClientRequest } from '../../../../core/models/request/clientRequest';
import { CommonModule } from '@angular/common';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-insert-client-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './insert-client-modal.component.html',
  styleUrl: './insert-client-modal.component.css'
})
export class InsertClientModalComponent {


  private _clientService = inject(ClientApiServiceService);
  public bsModalRef?: BsModalRef;
  clientObject : ClientRequest = new ClientRequest();
  private _modalService = inject(BsModalService);

  isLoading = false;
  formSubmitted = false;

  @Output() isClientInserted = new EventEmitter<boolean>();
  @Output() closeInsertClient = new EventEmitter<void>();

  onSubmit(form : NgForm){
    this.formSubmitted = true; 
    if(form.valid && !this.isLoading){
      this.isLoading = true;
      this.saveClient(this.clientObject);
      /* this.onCancel(); // close the box */
    }
    
  }


  onCancel(){
    this.closeInsertClient.emit();
  }



/*------------------------SAVE CLIENT API ------------------------------------------*/
  saveClient(clientObj: ClientRequest) : void{
     this._clientService.saveClient(clientObj).subscribe({
      next : 
        (response : ApiResponseModel<string>) => {
          this.isClientInserted.emit(true);
          this.isLoading= true; //it will keep on loading 
          setTimeout(()=> {  // after 2 sec it will change to false and stop loading.
            this.isLoading = false
          }, 1000)
        
          this.bsModalRef?.hide();
          console.log("Client Inserted Successfully");
        },
      error : 
        (error)=> { console.log("Error inserting new client." , error);
          this.isLoading = false;
         this.isClientInserted.emit(false);
      }
     })
  }
  








}
