import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchRequest } from '../../../../core/models/request/searchRequest';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent implements OnInit{

  /* Emits event to ClientTable */
  @Output() userSearch = new EventEmitter<SearchRequest>();
  /* Reactive form component */
  // searchControl = new FormControl("");

  userSearchRequest : SearchRequest = {
        searchBy : "email",
        searchQuery : ""
      }


      ngOnInit(): void {
        // this.emitUserSearch();
        // this.userSearchRequest.searchBy==="email"
      }



     emitUserSearch(){
      // setTimeout(()=>{
        this.userSearch.emit(this.userSearchRequest);
      // }, 2000)
      
     } 







  /*Reactive Search*/
 /*  ngOnInit(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),    // wait 300ms after last keystroke
      distinctUntilChanged() // only emit if value changed
    )
    .subscribe(searchTerm => {
      this.userSearchRequest.searchQuery = searchTerm || '';
      this.emitUserSearch();
    });
  } */

  /* updateSearchBy(searchBy: string) {
    this.userSearchRequest.searchBy = searchBy;
    this.emitUserSearch();
  } */

  /*emits the searchQuery and search by*/
 /*  emitUserSearch(){
    console.log("user search emmited")
    this.userSearch.emit(this.userSearchRequest);
  } */




}
