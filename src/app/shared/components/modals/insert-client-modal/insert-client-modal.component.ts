
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientApiServiceService } from '../../../../core/services/client-api/client-api-service.service';
import { ClientRequest } from '../../../../core/models/request/clientRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insert-client-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './insert-client-modal.component.html',
  styleUrl: './insert-client-modal.component.css'
})
export class InsertClientModalComponent {

  private _clientService = inject(ClientApiServiceService);
  /* clientObject : ClientRequest = new ClientRequest(); */


  @Output() clientInserted = new EventEmitter<any>();
  isLoading = false;
  clientForm: FormGroup;
  bsModalRef?: BsModalRef;
  //This is for the local use in this component.
  isInserted :boolean;

  //sending to clientTable to inform if the client is inserted or not.
  @Output() isClientInserted = new EventEmitter<boolean | null>();
    

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{4,10}$/)]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid && !this.isLoading) {
      this.isLoading = true;
      const clientObj : ClientRequest = {
        firstName : this.clientForm.value.firstName,
        lastName :this.clientForm.value.firstName,
        postalCode : this.clientForm.value.postalCode,
        dateOfBirth : new Date(this.clientForm.value.dateOfBirth)
      };
      this._clientService.saveClient(clientObj).subscribe({
        next: () => {
          this.bsModalRef?.hide();
          this.isInserted = true;
          this.isClientInserted.emit(true);
          // Optionally emit event to parent if needed
        },
        error: (err) => {
          console.error('Insert failed', err);
          this.isInserted = false;
          this.isLoading = false;
          this.isClientInserted.emit(false);
        },
        complete: () => this.isLoading = false
      });
    }

     /*  this.clientInserted.emit(this.clientForm.value);
      this.bsModalRef?.hide(); */
    
  }

  onCancel(): void {
    this.bsModalRef?.hide();
  }









}
