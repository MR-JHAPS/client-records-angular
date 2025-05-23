import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SearchRequest } from '../../../../core/models/request/searchRequest';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-client-search',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.css'
})
export class ClientSearchComponent implements OnInit {
  
  /* Emits event to ClientTable */
  @Output() clientSearch = new EventEmitter<SearchRequest>();

  /* Reactive form component */
  searchControl = new FormControl("");

  clientSearchRequest : SearchRequest = {
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
    this.clientSearch.emit(this.clientSearchRequest);
  }












}
