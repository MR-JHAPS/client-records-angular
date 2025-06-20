import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../material';
import { CommonModule } from '@angular/common';
import { BulkClientDeleteRequest } from '../../../core/models/request/bulkClientDeleteRequest';
import { TableDataModel } from '../../../core/uiModels/tableDataModel';
import { SearchUiComponent } from "../search-ui/search-ui.component";
import { SearchRequest } from '../../../core/models/request/searchRequest';
import { SearchDataModel } from '../../../core/uiModels/searchDataModel';

@Component({
  selector: 'app-table-ui',
  imports: [MaterialModules, CommonModule, SearchUiComponent],
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
  @Input() buttonList : string[];
  @Input() includeSearchBar : boolean;
  @Input() searchFieldsTable : SearchDataModel[];
  
  

  @Output() selectedClientEventEmitter = new EventEmitter<BulkClientDeleteRequest>();
  @Output() sortColumnEmitter = new EventEmitter<string>();
  
  /**
   * Emits the searchRequest obtained from <app-search-ui/>
  */
  @Output() searchEventEmitter =  new EventEmitter<SearchRequest>();

   selectedContent :BulkClientDeleteRequest = new BulkClientDeleteRequest();
   isCheckBoxChecked = false; //for the dynamic insert/delete button.

  isSortClicked = true;
  isSortIdVisible = false;
  isSortFirstNameVisible = false;
  isSortLastNameVisible = false;
  isSortDOBVisible = false;
  isSortPostalCodeVisible = false;



   //This is to check the width of the screen to change table to accordian:
    @HostListener("window:resize", [])
    onResize(){
      this.checkScreen();
    }
  
    checkScreen(){
      this.isMobile = window.innerWidth<700 ;
    }
  
    
    resetCheckBox():void{

    }


    toggleClientSelection(id: number){

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



  navigateToUpdatePage(id: number){

  }

  openDeleteSingleClientModal(id: number){

  }


  /** calls the searchQuery event-emitter.*/
  emitSearchRequest(searchRequest: SearchRequest):void{
    this.searchEventEmitter.emit(searchRequest);
  }



}
