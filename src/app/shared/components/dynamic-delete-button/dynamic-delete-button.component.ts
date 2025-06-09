import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-delete-button',
  imports: [CommonModule],
  templateUrl: './dynamic-delete-button.component.html',
  styleUrl: './dynamic-delete-button.component.css'
})
export class DynamicDeleteButtonComponent {


  @Output() deleteSelectedEmitter = new EventEmitter<void>();
  @Output() resetSelectedEmitter = new EventEmitter<void>();

  //this is used to show or hide the buttons.
  // @Input() isFileSelected = false;




  emitDeleteSelectedImages():void{
    this.deleteSelectedEmitter.emit();
  }


  emitResetSelectedImages():void{
    this.resetSelectedEmitter.emit();
  }





}//ends class
