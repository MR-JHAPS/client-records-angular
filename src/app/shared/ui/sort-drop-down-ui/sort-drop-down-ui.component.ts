import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Direction, SortRequest } from '../../../core/models/request/sortRequest';
import { FormsModule } from '@angular/forms';
import { TableDataModel } from '../../../core/uiModels/tableDataModel';

@Component({
  selector: 'app-sort-drop-down-ui',
  imports: [FormsModule],
  templateUrl: './sort-drop-down-ui.component.html',
  styleUrl: './sort-drop-down-ui.component.css'
})
export class SortDropDownUiComponent {


    @Input() tableColumns : TableDataModel[] = [];

    @Output() sortByEventEmitter = new EventEmitter<SortRequest>();
    Direction = Direction; //enum

    sortRequest : SortRequest = new SortRequest();


  emitSortBy(){
        this.sortByEventEmitter.emit(this.sortRequest);
        console.log("Event created by clicking sortBy options" + this.sortRequest.sortBy + this.sortRequest.direction )
      }
  
      setSortByValue(event : Event):void{
        const selectedElement = event.target as HTMLSelectElement;
        const sortByValue = selectedElement.value;
        this.sortRequest.setSortBy(sortByValue);
        this.emitSortBy();
      }
  
      setSortDirectionValue(event : Event):void{
        const selectedElement = event.target as HTMLSelectElement;
        const directionValue = selectedElement.value as Direction;
        this.sortRequest.setDirection(directionValue);
        this.emitSortBy();
      }



}
