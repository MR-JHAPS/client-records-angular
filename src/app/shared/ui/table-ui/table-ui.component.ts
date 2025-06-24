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

@Component({
  selector: 'app-table-ui',
  imports: [MaterialModules, CommonModule, SearchUiComponent, FloatingButtonTabComponent, DateConverterPipe, AvatarImgComponent, ButtonsUiComponent, LoaderUiComponent, AccordionUiComponent],
  templateUrl: './table-ui.component.html',
  styleUrl: './table-ui.component.css'
})
export class TableUIComponent {


  isMobile = false; // this stores if the viewing device is mobile/laptop.
  isLoading = false;
  isSearchResultPresent: boolean;

  @Input() includeCheckbox : boolean;
  @Input() tableColumnsChild : TableDataModel[];
  @Input() contents : any[];
  @Input() includeButtons : boolean;
  @Input() buttonListTable : ButtonDataModel[];
  @Input() includeSearchBar : boolean;
  @Input() searchFieldsData : SearchDataModel[];
  
  

  @Output() deleteSelectedEventEmitter = new EventEmitter<number[]>();
  @Output() sortColumnEmitter = new EventEmitter<string>();
  @Output() 
  
  /**
   * Emits the searchRequest obtained from <app-search-ui/>
  */
  @Output() searchEventEmitter =  new EventEmitter<SearchRequest>();

   selectedContent : number[] = []; // this is the checked items from checkbox.
  //  isCheckBoxChecked = false; //for the dynamic insert/delete button.

  isSortClicked = true;
  isSortIdVisible = false;
  isSortFirstNameVisible = false;
  isSortLastNameVisible = false;
  isSortDOBVisible = false;
  isSortPostalCodeVisible = false;



  //  //This is to check the width of the screen to change table to accordian:
  //   @HostListener("window:resize", [])
  //   onResize(){
  //     this.checkScreen();
  //   }
  
  //   checkScreen(){
  //     this.isMobile = window.innerWidth<700 ;
  //   }
  

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
      this.deleteSelectedEventEmitter.emit(this.selectedContent);
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



    get firstTwoColumns() {
      return this.tableColumnsChild.slice(0, 2);
    }
      /*------------------------ Sorting TABLE METHODS ---------------------------------------------------------------------*/

  showSortIcon(field: string){
    if(field=="id"){
       this.isSortIdVisible = true;
    }else if(field==="firstName"){
      this.isSortFirstNameVisible = true;
    }else if(field==="lastName"){
      this.isSortLastNameVisible = true;
    }else if(field==="postalCode"){
      this.isSortPostalCodeVisible = true;
    }else if(field==="dateOfBirth"){
      this.isSortDOBVisible = true;
    }
  }

  hideSortIcon(){
    this.isSortIdVisible = false;
    this.isSortFirstNameVisible = false;
    this.isSortLastNameVisible = false;
    this.isSortPostalCodeVisible = false;
    this.isSortDOBVisible = false;
  }



  onSortClick(column: string){
    this.sortColumnEmitter.emit(column);
  }



  /* ------------------------BUTTONS FUNCTIONS------------------------------------ */
    verifyClickedButton(buttonClicked : string) :void {
      console.log("The button clicked was : ", buttonClicked);
    }




/* ---------------------------------------------------------------------------------------- */

  navigateToUpdatePage(id: number){

  }

  openDeleteSingleClientModal(id: number){

  }


  /** calls the searchQuery event-emitter.*/
  emitSearchRequest(searchRequest: SearchRequest):void{
    this.searchEventEmitter.emit(searchRequest);
  }



}
