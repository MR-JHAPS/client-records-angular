import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-ui',
  imports: [],
  templateUrl: './checkbox-ui.component.html',
  styleUrl: './checkbox-ui.component.css'
})
export class CheckboxUiComponent {


  checkedIds : number[] = [];

  @Input() currentSelectedId : number;

  @Output() checkboxEventEmitter = new EventEmitter<number[]>();


  toggleCheckbox(id : number){
    if(this.checkedIds.includes(id)){
      this.checkedIds = this.checkedIds.filter((idx)=> idx !== id);
      this.checkboxEventEmitter.emit(this.checkedIds);
      console.log("Untoggled Ids ",this.checkedIds);
    }else{
      this.checkedIds = [...this.checkedIds, id];
      this.checkboxEventEmitter.emit(this.checkedIds);
      console.log("Toggled Ids ", this.checkedIds);
    }
  }

  // resetCheckbox():void{
  //   this.checkedIds = [];
  // }


}
