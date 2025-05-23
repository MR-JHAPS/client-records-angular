import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ClientLogService } from '../../../../core/services/clientLogApi/client-log.service';
import { ClientLogResponse } from '../../../../core/models/response/clientLogResponse';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ApiPageDetails } from '../../../../core/models/responseModel/apiPageDetails';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { PaginationComponent } from "../../pagination/pagination/pagination.component";
import { PaginationServiceService } from '../../../../core/services/paginationService/pagination-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateConverterPipe } from '../../../pipes/dateConverter/date-converter.pipe';

@Component({
  selector: 'app-client-log-table',
  imports: [PaginationComponent, CommonModule, DateConverterPipe],
  templateUrl: './client-log-table.component.html',
  styleUrl: './client-log-table.component.css'
})
export class ClientLogTableComponent implements OnInit {

  private _router = inject(Router);
  private _clientLogService = inject(ClientLogService);
  private _paginationService = inject(PaginationServiceService);
  private _toastrService = inject(ToastrService);
  clientLogList : Array<ClientLogResponse>;
  apiPageLink : Array<ApiLinksDetails>;
  isLoading = true;
  isMobile = false;
  detailsToggle = "hideDetails";
  expandedClientId : number | null = null;

  /* For sorting */
  isSortClicked = true;
  isSortIdVisible = false;
  isSortFirstNameVisible = false;
  isSortLastNameVisible = false;
  isSortDOBVisible = false;
  isSortPostalCodeVisible = false;
  isSortUpdatedAtVisible = false;

ngOnInit(): void {
  this.onResize();
  this.getAllClientLogs();
}


 //This is to check the width of the screen to change table to accordian:
  @HostListener("window:resize", [])
  onResize(){
    this.checkScreen();
  }

  checkScreen(){
    this.isMobile = window.innerWidth<800 ;
  }




    /*------------------------ Sorting TABLE METHODS ---------------------------------------------------------------------*/

  showSortIcon(field: string){
    if(field==="id"){
       this.isSortIdVisible = true;
    }else if(field==="firstName"){
      this.isSortFirstNameVisible = true;
    }else if(field==="lastName"){
      this.isSortLastNameVisible = true;
    }else if(field==="postalCode"){
      this.isSortPostalCodeVisible = true;
    }else if(field==="dateOfBirth"){
      this.isSortDOBVisible = true;
    }else if(field==="updatedAt"){
      this.isSortUpdatedAtVisible = true;
    }
  }

  hideSortIcon(){
    this.isSortIdVisible = false;
    this.isSortFirstNameVisible = false;
    this.isSortLastNameVisible = false;
    this.isSortPostalCodeVisible = false;
    this.isSortDOBVisible = false;
    this.isSortUpdatedAtVisible = false;
  }

  onSortClick(field : string){
    this.isSortClicked = !this.isSortClicked;
    let sortBy = "";
    if(field=="id"){
       sortBy = "id";
    }else if(field==="firstName"){
      sortBy = "firstName";
    }else if(field==="lastName"){
      sortBy = "lastName";
    }else if(field==="postalCode"){
      sortBy = "postalCode";
    }else if(field==="dateOfBirth"){
      sortBy = "dateOfBirth";
    }else if(field==="updatedAt"){
      sortBy = "updatedAt";
    }

    if(this.isSortClicked){
        this.getAllClientLogs(0,10,sortBy,"asc");
    }else{
        this.getAllClientLogs(0,10,sortBy, "desc");
    }
  }//ends method

  /* TO SHOW AND HIDE THE CLIENTLOG CONTENTS...... */

  toggleDetails(id: number):void{
    this.detailsToggle = "showDetails";
    /* if clicked the button for the same id it will set null to hide else set the id to show details */
    this.expandedClientId = this.expandedClientId === id ? null : id;
  }

  /* -------------------------------------------------------------------------------------------- */

  getAllClientLogs(pageNumber?: number, size?: number, sortBy?:string, direction?:string): void{
    this._clientLogService.getAllClientLog(pageNumber, size, sortBy, direction).subscribe({
      next : (response : ApiResponseModelPaginated<ClientLogResponse>)=>{
        this.clientLogList = response.data.content;                
        this.apiPageLink = response.data.links;
        console.log("Getting the clientLog datas.")
        this.isLoading = false;
      },
      error : (error)=>{
        console.log("error getting the clientLog Datas.", error);
        const errorCode = error.status;
        /* only redirect to error page if the status code is 500 or 404 */
        if(errorCode === 500 || errorCode === 404){ 
            this._router.navigate(["/error", errorCode]);
        }else{
          /* if some other error occurs just show the toastr error message */
          this._toastrService.error("Error! Unable to load the Client-Log.");
        }
      },
      complete : ()=>{
        console.log("ClientLog datas obtained successfully.");
      }
    })
  }


  /* PAGINATION */

  toSpecificPage(rawUrl: string): void {
    //passing the list of pagination Links to the service layer.
    this._paginationService.getRequiredPage(rawUrl).subscribe({
      next : (response: ApiResponseModelPaginated<ClientLogResponse>) => {
        this.clientLogList = response.data.content;
        //saving the list of (next, previous, last, first) page links in a variable.
        this.apiPageLink = response.data.links; 
        console.log(response.data);
      },
      error : (error)=> {
        console.log("Error occured while getting all the clients.", error);
        this._toastrService.error("Error Getting the Specific Page.");
      },
      complete : () => { console.log("All client obtained Successfully.")}
    })
  }
  
  
  
  
  
   /*------------------- This is for the Content Size of the page.--------------------------------------------------------------- */
    setContentPerPage(contentSize : number) : void{
      console.log(`clientLogTable Component ${contentSize} content size arrived.`)
      this.getAllClientLogs(0, contentSize);
    }







}// ends class.
