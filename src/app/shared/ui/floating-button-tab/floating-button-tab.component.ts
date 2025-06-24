import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button-tab',
  imports: [],
  templateUrl: './floating-button-tab.component.html',
  styleUrl: './floating-button-tab.component.css'
})
export class FloatingButtonTabComponent {

    @Output() deleteSelectedEmitter = new EventEmitter<void>();
    @Output() resetSelectedEmitter = new EventEmitter<void>();
  
  
  
  
  
    emitDeleteSelected():void{
      this.deleteSelectedEmitter.emit();
    }
  
  
    emitResetSelected():void{
      this.resetSelectedEmitter.emit();
    }



}
