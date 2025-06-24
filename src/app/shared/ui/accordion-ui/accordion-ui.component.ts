import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MaterialModules } from '../../../material';
import { CheckboxUiComponent } from "../checkbox-ui/checkbox-ui.component";
import { TableDataModel } from '../../../core/uiModels/tableDataModel';
import { CommonModule } from '@angular/common';
import { FloatingButtonTabComponent } from "../floating-button-tab/floating-button-tab.component";
import { AvatarImgComponent } from "../avatar-img/avatar-img.component";
import { DateConverterPipe } from '../../pipes/dateConverter/date-converter.pipe';
import { ButtonsUiComponent } from "../buttons-ui/buttons-ui.component";
import { ButtonDataModel } from '../../../core/uiModels/buttonDataModel';

@Component({
  selector: 'app-accordion-ui',
  imports: [MaterialModules, CheckboxUiComponent, CommonModule, FloatingButtonTabComponent, AvatarImgComponent, DateConverterPipe, ButtonsUiComponent],
  templateUrl: './accordion-ui.component.html',
  styleUrl: './accordion-ui.component.css'
})
export class AccordionUiComponent {

  @ViewChild(CheckboxUiComponent) checkBoxComponent !: CheckboxUiComponent;

  @Output() deleteCheckedIDEventEmitter = new EventEmitter<number[]>();

  @Input() tableConfig : TableDataModel[] = [];
  @Input() contents : any[];
  @Input() isSearchResultPresent : boolean = true;
  @Input() isLoading : boolean;
  @Input() includeCheckbox : boolean;
  @Input() buttonList : ButtonDataModel[] ; //stores the buttons that is to be displayed. 

  checkedIds : number[] = []
  // importantHeader : TableDataModel[] = this.tableConfig.filter((column)=>column.isImportant);









  navigateToUpdatePage(id : number) : void{

  }

  openDeleteModal(id : number) :void {

  }

  /* Emits the selected checkbox if the floating delete button is pressed. */
    deleteButtonClicked():void{
      this.deleteCheckedIDEventEmitter.emit(this.checkedIds);
      console.log("Emitting delete Selected from accordion : ", this.checkedIds);
    }

  /* Resets the selected Checkbox. */
    resetCheckBox():void{
      this.checkedIds = [];
      console.log("Resetted the ClientIds in accordion : ", this.checkedIds);
    }

  /* Toggles the checkbox (adds/removes id from the checkedIds accordingly.) */
    toggleCheckBox(id : number):void{
      if(this.checkedIds.includes(id)){
        this.checkedIds = this.checkedIds.filter((idx)=> id!==idx);
        console.log("Untoggled IDs in accordian", this.checkedIds);
      }else{
        this.checkedIds = [...this.checkedIds, id];
        console.log("Toggled IDs in accordian", this.checkedIds);
      }
    }

 


  


  //  emitCheckedIdList(idList : number[]):void{
  //   this.deleteCheckedIDEventEmitter.emit(idList);
  // }
}
