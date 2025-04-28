import { Component, inject, OnInit } from '@angular/core';
import { ClientLogService } from '../../../../core/services/clientLogApi/client-log.service';
import { ClientLogResponse } from '../../../../core/models/response/clientLogResponse';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ApiPageDetails } from '../../../../core/models/responseModel/apiPageDetails';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { PaginationComponent } from "../../pagination/pagination/pagination.component";
import { PaginationServiceService } from '../../../../core/services/paginationService/pagination-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-log-table',
  imports: [PaginationComponent],
  templateUrl: './client-log-table.component.html',
  styleUrl: './client-log-table.component.css'
})
export class ClientLogTableComponent implements OnInit {

  private _clientLogService = inject(ClientLogService);
  private _paginationService = inject(PaginationServiceService);
  private _toastrService = inject(ToastrService);
  clientLogList : Array<ClientLogResponse>;
  apiPageLink : Array<ApiLinksDetails>;

ngOnInit(): void {
  this.getAllClientLogs();
}

  getAllClientLogs(pageNumber?: number, size?: number): void{
    this._clientLogService.getAllClientLog(pageNumber, size).subscribe({
      next : (response : ApiResponseModelPaginated<ClientLogResponse>)=>{
        this.clientLogList = response.data.content;
        this.apiPageLink = response.data.links;
        console.log("Getting the clientLog datas.")
      },
      error : (error)=>{
        console.log("error getting the clientLog Datas.", error)
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
