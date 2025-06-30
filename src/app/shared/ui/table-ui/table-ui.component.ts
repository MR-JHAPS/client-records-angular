import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../material';
import { CommonModule } from '@angular/common';
import { BulkClientDeleteRequest } from '../../../core/models/request/bulkClientDeleteRequest';
import { TableDataModel } from '../../../core/uiModels/tableDataModel';
import { SearchUiComponent } from "../search-ui/search-ui.component";
import { SearchRequest } from '../../../core/models/request/searchRequest';
import { SearchDataModel } from '../../../core/uiModels/searchDataModel';
import { FloatingButtonTabComponent } from "../floating-button-tab/floating-button-tab.component";
import { CheckboxUiComponent } from "../checkbox-ui/checkbox-ui.component";
import { DateConverterPipe } from '../../pipes/dateConverter/date-converter.pipe';
import { AvatarImgComponent } from "../avatar-img/avatar-img.component";
import { ButtonDataModel } from '../../../core/uiModels/buttonDataModel';
import { ButtonsUiComponent } from "../buttons-ui/buttons-ui.component";
import { LoaderUiComponent } from "../loader-ui/loader-ui.component";
import { AccordionUiComponent } from "../accordion-ui/accordion-ui.component";
import { FormsModule } from '@angular/forms';
import { SortRequest, Direction} from '../../../core/models/request/sortRequest';
import { SortDropDownUiComponent } from "../sort-drop-down-ui/sort-drop-down-ui.component";

@Component({
  selector: 'app-table-ui',
  imports: [MaterialModules, CommonModule,
    FormsModule, FloatingButtonTabComponent,
    DateConverterPipe, AvatarImgComponent,
    ButtonsUiComponent, LoaderUiComponent, SortDropDownUiComponent],
  templateUrl: './table-ui.component.html',
  styleUrl: './table-ui.component.css'
})
export class TableUIComponent {


  isMobile = false; // this stores if the viewing device is mobile/laptop.
  isLoading = false;
  // isSearchResultPresent: boolean = true;

  @Input() includeCheckbox : boolean;
  @Input() tableColumnsChild : TableDataModel[];
  @Input() contents : any[] = [];
  @Input() includeButtons : boolean;
  @Input() buttonListTable : ButtonDataModel[];
  @Input() includeInsertButton : boolean;

  isSearchResultPresent : boolean = this.contents.length>0 ? false : true;
  sortDirection: string = "";
  

  @Output() deleteMultipleEventEmitter = new EventEmitter<number[]>();
  @Output() sortByEventEmitter = new EventEmitter<SortRequest>();
  @Output() clickedButtonEventEmitter = new EventEmitter<{buttonAction:string, rowId:number |null}>();
  
  /**
   * Emits the searchRequest obtained from <app-search-ui/>
  */
  // @Output() searchEventEmitter =  new EventEmitter<SearchRequest>();

   selectedContent : number[] = []; // this is the checked items from checkbox.


  

    /* ---------------------------------------------THIS IS FOR THE CHECKBOX--------------------------------------------------------------------- */
    
    getCheckedIds(idList : number[]){
      this.selectedContent = idList;
    }

    resetCheckBox():void{
      this.selectedContent = [];
      console.log("Resetting the Selected Content : ", this.selectedContent);
    }

    emitDeleteSelected():void{
      console.log("before emitting delete button content : ", this.selectedContent);
      this.deleteMultipleEventEmitter.emit(this.selectedContent);
    }

    toggleCheckbox(id : number){
    if(this.selectedContent.includes(id)){
      this.selectedContent = this.selectedContent.filter((idx)=> idx !== id);
      console.log("Untoggled Ids ",this.selectedContent);
    }else{
      this.selectedContent = [...this.selectedContent, id];
      console.log("Toggled Ids ", this.selectedContent);
    }
  }




      /*------------------------ Sorting TABLE METHODS ---------------------------------------------------------------------*/

    emitSortBy(sortRequest : SortRequest){
      this.sortByEventEmitter.emit(sortRequest);
      console.log("Event created by clicking sortBy options" + sortRequest.sortBy + sortRequest.direction )
    }

    // setSortByValue(event : Event):void{
    //   const selectedElement = event.target as HTMLSelectElement;
    //   const sortByValue = selectedElement.value;
    //   this.sortRequest.setSortBy(sortByValue);
    //   this.emitSortBy();
    // }

    // setSortDirectionValue(event : Event):void{
    //   const selectedElement = event.target as HTMLSelectElement;
    //   const directionValue = selectedElement.value as Direction;
    //   this.sortRequest.setDirection(directionValue);
    //   this.emitSortBy();
    // }


  // onSortClick(column: string){
  //   this.sortColumnEmitter.emit(column);
  // }



  /* ------------------------BUTTONS FUNCTIONS------------------------------------ */
    verifyClickedButton(buttonClicked : string, selectedId ?: number) :void {
      console.log("The button clicked was : "+ buttonClicked + " And it's value/ id selected is : " + selectedId);
      this.clickedButtonEventEmitter.emit({buttonAction: buttonClicked, rowId: selectedId??null});
    }




/* ---------------------------------------------------------------------------------------- */

  navigateToUpdatePage(id: number){

  }

  openDeleteSingleClientModal(id: number){

  }


  /** calls the searchQuery event-emitter.*/
  // emitSearchRequest(searchRequest: SearchRequest):void{
  //   this.searchEventEmitter.emit(searchRequest);
  // }



}
