import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals = new Map<string, BsModalRef>(); // Track modals by ID

  constructor(private modalService: BsModalService) {}

  open(modalId: string, template: any) {
    const modalRef = this.modalService.show(template);
    this.modals.set(modalId, modalRef);
    return modalRef;
  }

  close(modalId: string) {
    this.modals.get(modalId)?.hide();
    this.modals.delete(modalId);
  }

  closeAll() {
    this.modals.forEach(modalRef => modalRef.hide());
    this.modals.clear();
  }
}