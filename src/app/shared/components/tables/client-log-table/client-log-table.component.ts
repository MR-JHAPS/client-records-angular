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

@Component({
  selector: 'app-client-log-table',
  imports: [PaginationComponent, CommonModule],
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
    this.isMobile = window.innerWidth<600 ;
  }

  /* TO SHOW AND HIDE THE CLIENTLOG CONTENTS...... */

  toggleDetails(id: number):void{
    this.detailsToggle = "showDetails";
    /* if clicked the button for the same id it will set null to hide else set the id to show details */
    this.expandedClientId = this.expandedClientId === id ? null : id;
  }

  /* -------------------------------------------------------------------------------------------- */

  getAllClientLogs(pageNumber?: number, size?: number): void{
    this._clientLogService.getAllClientLog(pageNumber, size).subscribe({
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
