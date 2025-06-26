import { Component, HostListener, inject, OnInit } from '@angular/core';
import { BulkClientDeleteRequest } from '../../../core/models/request/bulkClientDeleteRequest';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ClientApiServiceService } from '../../../core/services/client-api/client-api-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommunicationServiceService } from '../../services/communication-service.service';
import { ClientResponse } from '../../../core/models/response/clientResponse';
import { ApiLinksDetails } from '../../../core/models/responseModel/apiLinksDetails';
import { TableUIComponent } from "../table-ui/table-ui.component";
import { ApiResponseModelPaginated } from '../../../core/models/responseModel/apiResponseModelPaginated';
import { TableDataModel } from '../../../core/uiModels/tableDataModel';
import { SearchDataModel } from '../../../core/uiModels/searchDataModel';
import { ButtonDataModel } from '../../../core/uiModels/buttonDataModel';
import { MaterialModules } from '../../../material';
import { AccordionUiComponent } from "../accordion-ui/accordion-ui.component";
import { SearchUiComponent } from "../search-ui/search-ui.component";
import { PaginationComponent } from "../../components/pagination/pagination/pagination.component";
import { ButtonTabsComponent } from "../../components/button-tabs/button-tabs.component";
import { ButtonTabs } from '../../../core/models/uiModal/buttonTabs';
import { NgClass } from '@angular/common';

export class ClientModel{
  constructor(
    public id : number = 0,
    public firstName : string ="",
    public lastName : string = "",
    public dateOfBirth : Date = new Date(),
    public postalCode : string = ""
  ){}
}

export class ClientLogModel{
  constructor(
    public id: number =0,
    // public clientId : number =0,
    public image : string = "",
    public firstName : string = "",
    public middleName : string = "",
    public lastName : string ="",
    public dateOfBirth : Date = new Date(),
    public postalCode : string = "",
    public userEmail : string = "",
    public modificationType :string = "",
    public updatedAt : Date = new Date(),
  ){}
}


@Component({
  selector: 'app-demo-client-table',
  imports: [TableUIComponent,
    NgClass,
    MaterialModules, AccordionUiComponent, SearchUiComponent, PaginationComponent, ButtonTabsComponent],
  templateUrl: './demo-client-table.component.html',
  styleUrl: './demo-client-table.component.css'
})
export class DemoClientTableComponent implements OnInit{

    //This is to check the width of the screen to change table to accordian:
    @HostListener("window:resize", [])
    onResize(){
      this.checkScreen();
    }
  
    checkScreen(){
      this.isMobile = window.innerWidth<700 ;
    }
    


    ngOnInit(): void {
      // this.getAllClients();
      this.pageLinks;
      this.onResize();
      this.onWindowScroll();
      
  
      /* suscribing to the communicationService behaviour subj to see if client is updated and display alert accordingly.*/
      // this.updateSubscription = this._communicationService.isClientUpdated$.subscribe(
      //   (isUpdated: boolean) => {
      //     if (isUpdated) {
      //       this._toastrService.success("Client updated successfully");
      //     }
      //   }
      // );
    }


    private _toastrService = inject(ToastrService);
    private _clientService = inject(ClientApiServiceService);
    private _router = inject(Router);
    private _modalService = inject(BsModalService);
    private _communicationService = inject(CommunicationServiceService); // for  update message if client update successful.
    bsModalRef?: BsModalRef;
    // clientList : Array<ClientResponse>;
    pageLinks : Array<ApiLinksDetails>; // this is for method : toSpecificPage(){} -->i.e: For pagination.
    selectedClients :BulkClientDeleteRequest = new BulkClientDeleteRequest();
    isCheckBoxChecked = false; //for the dynamic insert/delete button.
    isMobile = false; // this stores if the viewing device is mobile/laptop.
    isLoading = false;
    isSearchResultPresent = true; // this is to see if the searching contains no clients.
  
    isSortClicked = true;
    isSortIdVisible = false;
    isSortFirstNameVisible = false;
    isSortLastNameVisible = false;
    isSortDOBVisible = false;
    isSortPostalCodeVisible = false;


    isScrolled : boolean = false;


    
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY;
    this.isScrolled = scrollTop > 60; // if scroll is above 60px isScrolled = true;
  }

    searchField : SearchDataModel[] = [
      new SearchDataModel("Any", "searchQuery"),
      new SearchDataModel("FirstName", "firstName"),
      new SearchDataModel("LastName", "lastName"),
      new SearchDataModel("PostalCode", "postalCode"),
    ];

    buttonList : ButtonDataModel[] = [
      {buttonLabel: "Update", buttonValue: "update", includeLabel:true},
      {buttonLabel: "Delete", buttonValue: "delete", includeLabel:true}      
    ];

    buttonTabList : ButtonTabs[] = [
      new ButtonTabs("Client-Log", "/demoClientTable"),
      new ButtonTabs("User Table", "/home")
    ]

    tableColumns : TableDataModel[] = [
      { header: 'ID', contentKey: 'id' },
      { header: 'First Name', contentKey: 'firstName' },
      { header: 'Last Name', contentKey: 'lastName' },
      { header: 'Date of Birth', contentKey: 'dateOfBirth', isDate: true },
      { header: 'Postal Code', contentKey: 'postalCode' }
    ]


    clientLogColumns : TableDataModel[] = [
       { header: 'ID', contentKey: 'id', isImportant: true },
       {header : 'Image', contentKey: 'image', isImage: true, isImportant: true},
       { header: 'First Name', contentKey: 'firstName', isImportant: true },
      { header: 'First Name', contentKey: 'middleName' },
      { header: 'Last Name', contentKey: 'lastName', isImportant: true },
      { header: 'Date of Birth', contentKey: 'dateOfBirth', isDate: true },
      { header: 'Postal Code', contentKey: 'postalCode' },
      { header: 'User Email', contentKey: 'userEmail' },
      { header: 'Modification Type', contentKey: 'modificationType', highlightColumn: true },
      { header: 'Updated At', contentKey: 'updatedAt', isDate :true},
    ]

    /* contains the client Response Details. */
    get clientList(): ClientModel[] {
      let clientList : ClientModel[] = [] ;
      for(let i=0 ; i<20 ; i++){
        clientList.push( new ClientModel(i, "user"+i , "lname"+i, new Date(2009-2-1+i), "4080"+i ));
      }
      return clientList;
    }

    get clientLogList(): ClientLogModel[] {
      let clientLogList : ClientLogModel[] = [] ;
      for(let i=0 ; i<20 ; i++){
        clientLogList.push( new ClientLogModel(i, "default"+i+".jpg", "user"+i , "middle"+i ,"lname"+i, new Date(2009-2-1+i), "4080"+i, 
                            "user"+i+"@gmail.com", "update", new Date(Date.now()) ));
      }
      return clientLogList;
    }
    

  
  
    deleteSelectedClient(idList : number[]):void{
      this.clientLogList.forEach((client)=>{
        if(idList.includes(client.id)){
          console.log("Deleting the user of id : " + client.id + "and name : " + client.firstName );
        }
      })
    }


    setContentSize(size : number) :void{
      
    }





  //  getAllClients(pageNumber?:number, pageSize?: number,
  //     sortBy?: string, direction?: string ) : void {
  
  //     this._clientService.getAllClients(pageNumber, pageSize, sortBy, direction).subscribe({
  //       next : (response: ApiResponseModelPaginated<ClientResponse>) => {
  //         this.clientList = response.data.content;
  //         //saving the list of (next, previous, last, first) page links in a variable.
  //         this.pageLinks = response.data.links; 
  //         this.isLoading = false;
  //         console.log("This is of the demo client Table" , response.data);
  //       },
  //       error : (error)=> {
  //         console.log("Error occured while getting all the clients.", error);
  //         this.isLoading = true;
  //       },
  //       complete : () => { console.log("All client obtained Successfully.")}
  //     })
  //   }


}
