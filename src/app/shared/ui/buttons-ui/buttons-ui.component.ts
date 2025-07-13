import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonVariant } from '../../../core/uiEnums/buttonVariants';
import { ButtonSize } from '../../../core/uiEnums/buttonSize';
import { ButtonShape } from '../../../core/uiEnums/buttonShape';

@Component({
  selector: 'app-buttons-ui',
  imports: [NgClass],
  templateUrl: './buttons-ui.component.html',
  styleUrl: './buttons-ui.component.css'
})
export class ButtonsUiComponent {

  
    @Input() size : ButtonSize = ButtonSize.MEDIUM ;
    @Input() shape : ButtonShape = ButtonShape.RECTANGLE ;
    @Input() variant : ButtonVariant | string = 'primary';
    @Input() disabled : boolean = false;

    @Output() buttonClicked = new EventEmitter<void>(); 



    onClick() : void{
      if(!this.disabled){
        this.buttonClicked.emit();
      }
    }
 


    get buttonClass(): string[]{

      return [
        "button",
        `button-${this.size}`,
        `button-${this.shape}`,
        `button-${this.variant}`,
        this.disabled ?"button-disabled" : ""
      ];
    }


 
 
 
 
 
 
 
 
 
 
 
 
 
  // @Output() buttonClickedEventEmitter = new EventEmitter<string>();
  // @Input() buttonValue : string; //this is the value of the button.
  // @Input() buttonLabel : string; // this is the label of the button.
  // @Input() includeButtonLabel : boolean; 

  // /* I will need to creaete a new input type that has the whole buttonModel 
  //   and i will add new input asking if the label is needed in the button
  //    and if no label i will make the button border radius 50% if there is label then i will create a 
  //    rectangular button with soft edge.
  
  // */


  //    /* This is to load the style for the button selected */
  // get buttonClass() : string{
  //     switch(this.buttonValue){
  //       case "insert" : 
  //           return this.includeButtonLabel ? "insertButtonLabelled" : "insertButton"
  //       case "update" :
  //         return this.includeButtonLabel ? "updateButtonLabelled" : "updateButton";
  //       case "restore" :
  //         return this.includeButtonLabel ? "restoreButtonLabelled btn btn-success" : "restoreButton btn btn-success"; 
  //       case "delete" :
  //         return this.includeButtonLabel ? "deleteButtonLabelled" : "deleteButton" ;
  //       default :
  //         return this.includeButtonLabel ? "ordinaryButtonLabelled btn btn-primary" : "ordinaryButton btn btn-primary" ; 
  //     }
  // }

  // /* This is to load the icons value */
  // get buttonIcon() : string{
  //   switch(this.buttonValue){
  //     case "insert" : 
  //           return "fas fa-plus fa-lg "
  //     case "update" :
  //       return "fa-solid fa-pen";
  //     case "restore" :
  //       return "fa-solid fa-clock-rotate-left"; 
  //     case "delete" :
  //       return "fa-solid fa-trash" ;
  //     default :
  //       return ""; 
  //   }
  // }









  // emitButtonClicked(event : Event){
  //   event.stopPropagation(); // this won't bubble up in parent class.
  //   console.log("Emitted Button value after being clicked in Button UI : " + this.buttonValue);
  //   this.buttonClickedEventEmitter.emit(this.buttonValue);
  // }





  
}//ends class.
