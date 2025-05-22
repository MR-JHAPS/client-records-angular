import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { UserAdminResponse } from '../../../../core/models/response/userAdminResponse';
import { UserApiServiceService } from '../../../../core/services/user-api/user-api-service.service';
import { AdminServiceService } from '../../../../core/services/admin-api/admin-service.service';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ToastrService } from 'ngx-toastr';
import { ClientSearchComponent } from "../../search/client-search/client-search.component";
import { UserSearchComponent } from "../../search/user-search/user-search.component";
import { SearchRequest } from '../../../../core/models/request/searchRequest';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { Subject, toArray } from 'rxjs';
import { NoImageDirective } from '../../../directives/noImageDirective/no-image.directive';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../../../material';
import { PaginationComponent } from "../../pagination/pagination/pagination.component";
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { DateConverterPipe } from '../../../pipes/dateConverter/date-converter.pipe';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateUserRolesComponent } from '../../modals/update-user-roles/update-user-roles.component';
import { UserRoleUpdatedCommunicationService } from '../../../services/userRoleUpdatedCommunication/user-role-updated-communication.service';

@Component({
  selector: 'app-user-table',
  imports: [UserSearchComponent, NoImageDirective, CommonModule, MaterialModules, PaginationComponent,DateConverterPipe],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {

  private _adminService = inject(AdminServiceService);
  private _toastrService = inject(ToastrService);
  bsModalRef = inject(BsModalRef);
  _modalService = inject(BsModalService);
  userList : UserAdminResponse[] ;
  singleUser : UserAdminResponse;
  pageLinks : Array<ApiLinksDetails>; // this is for method : toSpecificPage(){} -->i.e: For pagination.
  roleUpdatedCommunicationService = inject(UserRoleUpdatedCommunicationService);

  isLoading = true;
  isMobile = false;

  ngOnInit(): void {
    this.onResize();
    this.getAllUsers();  
     this.pageLinks;

     this.roleUpdatedCommunicationService.roleUpdated$.subscribe((isUpdated : boolean)=>{
        if(isUpdated){
          console.log("initiating communication service in userTable oninit");
          this.getAllUsers();
        }
     })
  }


    // /* This is the trial of the select checkbox */

    // isHidden = true;

    // onOptionClick(){
    //   this.isHidden = !this.isHidden;
    // }








    //This is to check the width of the screen to change table to accordian:
    @HostListener("window:resize", [])
    onResize(){
      this.checkScreen();
    }
  
    checkScreen(){
      this.isMobile = window.innerWidth<600 ;
    }
  
    readonly panelOpenState = signal(false);




  getAllUsers(pageNumber?:number, pageSize?: number,
           sortBy?: string, direction?: string )  :  void {
    this._adminService.getAllUsers().subscribe({
      next : (response : ApiResponseModelPaginated<UserAdminResponse>) => {
        this.userList = response.data.content;
        console.log("getting all users");
        this.isLoading = false;
      },
      error : (error) => {  
        this._toastrService.error("Error getting all the users");
        console.log("Error getAllUsers()", error)
        this.isLoading = false;
      },
      complete : ()=>{
        console.log("Get All users Successful");
      }
    })
  }


  searchUser(searchRequest : SearchRequest){
    console.log(searchRequest.searchBy + searchRequest.searchQuery);
    searchRequest.searchBy === "email"
    ?this.searchUserByEmail(searchRequest) 
    :this.searchUserByRole(searchRequest);
  }

  private searchUserByEmail(searchRequest : SearchRequest){
    this.isLoading = true;
    this._adminService.searchUserByEmail(searchRequest).subscribe({
      next : (response : ApiResponseModel<UserAdminResponse>) =>{
        // const responseUser = response.data;
        this.userList  = [response.data];
        console.log("searching user by Email.");
        this.isLoading = false;
      },
      error : (error) =>{
        console.log("error searching user by email.")
        this.isLoading = false;
      },
      complete : ()=>{
        console.log("Searching user By email successful");
      }
    })
  }

  private searchUserByRole(searchRequest : SearchRequest){
    this.isLoading = true;
    this._adminService.searchUserByRole(searchRequest).subscribe({
      next : (response : ApiResponseModelPaginated<UserAdminResponse>) =>{
        this.userList  = response.data.content;
        console.log("searching user by Role.");
        this.isLoading = false;
      },
      error : (error) =>{
        console.log("error searching user by Role.")
        this.isLoading = false;
      },
      complete : ()=>{
        console.log("Searching user By Role successful");
      }
    })
  }



  updateButtonClick(userId: number):void{
    this.getUserById(userId);

  }


  /* Getting the User of userAdminResponse */
  getUserById(id: number):void{
    this._adminService.getUserById(id).subscribe({
      next : (response : ApiResponseModel<UserAdminResponse>) =>{
        this.singleUser = response.data;
        this.openUpdateModal(); // opens modal once the data is obtained
      },

      error : (error)=>{
        console.log("Unable to get the userAdminResponse",error);
      },
      complete : ()=>{
        console.log("Successfully obtained userAdminResponse");
      }
    })

  }



  /* ----THis is for the update userRole Modal----------------------- */
  openUpdateModal() :void{
      this.bsModalRef = this._modalService.show(UpdateUserRolesComponent, {
        initialState: {
          userAdmin : this.singleUser
        }
      })

    }



  deleteUserAsAdmin(userId: number):void{

  }











/*------------------------- This is for the Pagination.--------------------------------------------------------------------- */

//@param: action  is "prev", "next", "self", "first", "last"
// toSpecificPage(action: string): void {
//   //passing the list of pagination Links to the service layer.
//   this._clientService.getRequiredPage(this.pageLinks, action).subscribe({
//     next : (response: ApiResponseModelPaginated<ClientResponse>) => {
//       this.clientList = response.data.content;
//       //saving the list of (next, previous, last, first) page links in a variable.
//       this.pageLinks = response.data.links; 
//       console.log(response.data);
//     },
//     error : (error)=> {
//       console.log("Error occured while getting all the clients.", error);
//       this._toastrService.error("Error Getting the Specific Page.");
//     },
//     complete : () => { console.log("All client obtained Successfully.")}
//   })
// }


toSpecificPage(rawUrl: string): void {
  //passing the list of pagination Links to the service layer.
  this._adminService.getRequiredPage(rawUrl).subscribe({
    next : (response: ApiResponseModelPaginated<UserAdminResponse>) => {
      this.userList = response.data.content;
      //saving the list of (next, previous, last, first) page links in a variable.
      this.pageLinks = response.data.links; 
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
    this.getAllUsers(0, contentSize);
  }









}
