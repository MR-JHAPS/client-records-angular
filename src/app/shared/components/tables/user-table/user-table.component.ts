import { Component, inject, OnInit } from '@angular/core';
import { UserAdminResponse } from '../../../../core/models/response/userAdminResponse';
import { UserApiServiceService } from '../../../../core/services/user-api/user-api-service.service';
import { AdminServiceService } from '../../../../core/services/admin-api/admin-service.service';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ToastrService } from 'ngx-toastr';
import { ClientSearchComponent } from "../../search/client-search/client-search.component";
import { UserSearchComponent } from "../../search/user-search/user-search.component";
import { SearchRequest } from '../../../../core/models/request/searchRequest';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { toArray } from 'rxjs';

@Component({
  selector: 'app-user-table',
  imports: [UserSearchComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {

  private _adminService = inject(AdminServiceService);
  private _toastrService = inject(ToastrService);
  
  userList : UserAdminResponse[] ;


  ngOnInit(): void {
    this.getAllUsers();  
  }


  getAllUsers(): void{
    this._adminService.getAllUsers().subscribe({
      next : (response : ApiResponseModelPaginated<UserAdminResponse>) => {
        this.userList = response.data.content;
        console.log("getting all users");
      },
      error : (error) => {  
        this._toastrService.error("Error getting all the users");
        console.log("Error getAllUsers()", error)
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
    this._adminService.searchUserByEmail(searchRequest).subscribe({
      next : (response : ApiResponseModel<UserAdminResponse>) =>{
        this.userList  = [response.data];
        console.log("searching user by Email.");
      },
      error : (error) =>{
        console.log("error searching user by email.")
      },
      complete : ()=>{
        console.log("Searching user By email successful");
      }
    })
  }

  private searchUserByRole(searchRequest : SearchRequest){
    this._adminService.searchUserByRole(searchRequest).subscribe({
      next : (response : ApiResponseModelPaginated<UserAdminResponse>) =>{
        this.userList  = response.data.content;
        console.log("searching user by Role.");
      },
      error : (error) =>{
        console.log("error searching user by Role.")
      },
      complete : ()=>{
        console.log("Searching user By Role successful");
      }
    })
  }







}
