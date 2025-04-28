import { Component, inject, OnInit } from '@angular/core';
import { ClientBinService } from '../../../../core/services/clientBinApi/client-bin.service';
import { clientBinResponse } from '../../../../core/models/response/clientBinResponse';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../../core/auth/services/auth-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { PaginationServiceService } from '../../../../core/services/paginationService/pagination-service.service';
import { PaginationComponent } from "../../pagination/pagination/pagination.component";

@Component({
  selector: 'app-client-bin',
  imports: [NgIf, CommonModule, PaginationComponent],
  templateUrl: './client-bin.component.html',
  styleUrl: './client-bin.component.css'
})
export class ClientBinComponent implements OnInit {

  private _clientBinService = inject(ClientBinService);
  private routerSub!: Subscription;
  private _toastrService = inject(ToastrService);
  private _authService = inject(AuthServiceService);
  private _paginationService = inject(PaginationServiceService);
  private _router = inject(Router);
  clientBinList : Array<clientBinResponse>;
  apiPageLink : Array<ApiLinksDetails>; // this contains the pageLinks (next,first,last, previous)
  isRoleUser$ = this._authService.isRoleUser$
  isRoleAdmin$ = this._authService.isRoleAdmin$;
  
  ngOnInit(): void {
    this.getAllClientBin();
      this._authService.initializeAuthState();
  
      this.routerSub =  this._router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Force menu refresh on route change (including back button)
        this._authService.initializeAuthState(); 
      });
    }




  getAllClientBin(pageNumber?: number, size?: number):void{
    this._clientBinService.getAllClientBin(pageNumber, size).subscribe({
      next : (response: ApiResponseModelPaginated<clientBinResponse>)=>{
        this.clientBinList =  response.data.content;
        this.apiPageLink = response.data.links;
        console.log("Getting ClientBin data");
      },
      error : (error)=>{
        console.log("Error getting the ClientBin Data", error);
      },
      complete: ()=>{
        console.log("ClientBin fetched Successfully.");
      }
    })
  }



  restoreFromClientBin(id:number):void{
    this._clientBinService.restoreFromClientBin(id).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        this._toastrService.success(`Client of ID ${id} restored successfully.`);
        this.getAllClientBin();
      },
      error : (error)=>{
        this._toastrService.error(`Unable to Restore the client of Id ${id}`);
        console.log("unable to restore the client from clientBin.", error);
      },
      complete : ()=>{
        console.log("Client restored from clientBin successfully.");
      }
    })
  }


  deleteFromClientBin(id : number) : void {
    this._clientBinService.deleteFromClientBin(id).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        this._toastrService.success(`Client of ID ${id} deleted successfully.`);
        this.getAllClientBin();
      },
      error : (error)=>{
        this._toastrService.error(`Unable to Delete the client of Id ${id}`);
        console.log("unable to Delete the client from clientBin.", error);
      },
      complete : ()=>{
        console.log("Client Deleted from clientBin successfully.");
      }
    })

  }




  /* PAGINATION */

  toSpecificPage(rawUrl: string): void {
      //passing the list of pagination Links to the service layer.
      this._paginationService.getRequiredPage(rawUrl).subscribe({
        next : (response: ApiResponseModelPaginated<clientBinResponse>) => {
          this.clientBinList = response.data.content;
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
        console.log(`clientBinTable Component ${contentSize} content size arrived.`)
        this.getAllClientBin(0, contentSize);
      }





}//ends class
