import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-ui',
  imports: [],
  templateUrl: './buttons-ui.component.html',
  styleUrl: './buttons-ui.component.css'
})
export class ButtonsUiComponent {

  @Output() buttonClickedEventEmitter = new EventEmitter<string>();
  @Input() buttonType : string; //this is the value of the button.
  @Input() buttonLabel : string; // this is the label of the button.

  /* I will need to creaete a new input type that has the whole buttonModel 
    and i will add new input asking if the label is needed in the button
     and if no label i will make the button border radius 50% if there is label then i will create a 
     rectangular button with soft edge.
  
  */



  emitButtonClicked(buttonType: string){
    this.buttonClickedEventEmitter.emit(buttonType);
  }





  
}//ends class.
