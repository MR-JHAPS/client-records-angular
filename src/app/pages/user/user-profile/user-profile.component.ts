import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { ApiResponse } from '../../../core/models/apiResponse';
import { UserGeneralResponse } from '../../../core/api/models/interface/responses/userGeneralResponse';
import { I_ApiResponseModel } from '../../../core/api/models/interface/responses/apiResponseModel';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserUpdateRequest } from '../../../core/api/models/interface/requests/userUpdateRequest';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  ngOnInit(): void {
    this.getCurrentUser();  
  }
  isLoading = true;
  _httpClient = inject(HttpClient);
  _userApiService = inject(UserApiServiceService);
  // currentUser : any ;
  currentUser : UserGeneralResponse;
  userUpdateData : UserUpdateRequest ;

  

getCurrentUser():void{
  this._userApiService.getCurrentUser().subscribe({
    next : (response : I_ApiResponseModel) => { this.currentUser = response.data;
                          console.log(response)},
    error : (error) => {console.log("error getting current user :", error)},
    complete : () => {console.log("get Current User successfull."); this.isLoading=false;}
  })
}

updateCurrentUser(userUpdateData: UserUpdateRequest):void{
  this._userApiService.updateCurrentUser(userUpdateData);
}






}
