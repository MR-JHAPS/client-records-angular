import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchRequest } from '../../../core/models/request/searchRequest';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchDataModel } from '../../../core/uiModels/searchDataModel';

@Component({
  selector: 'app-search-ui',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-ui.component.html',
  styleUrl: './search-ui.component.css'
})
export class SearchUiComponent {

    @Output() searchEventEmitter = new EventEmitter<SearchRequest>();

    @Input() searchFieldsChild : SearchDataModel[] ; //this contains the radio button names
  
    /* Reactive form component */
    searchControl = new FormControl("");
  
      searchRequest : SearchRequest = {
          searchBy : "searchQuery",
          searchQuery : ""
        }
  
  
    
  
        /*Reactive Search*/
    ngOnInit(): void {
      this.searchControl.valueChanges
      .pipe(
        debounceTime(300),    // wait 300ms after last keystroke
        distinctUntilChanged() // only emit if value changed
      )
      .subscribe(searchTerm => {
        this.emitClientSearch();
      });
    }
  
  
    /*emits the searchQuery and search by*/
    emitClientSearch(){
      this.searchEventEmitter.emit(this.searchRequest);
    }
  

}
