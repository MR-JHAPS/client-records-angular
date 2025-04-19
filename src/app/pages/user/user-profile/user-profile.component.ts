import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomDateConverterService } from '../../../shared/customDateConverter';
import { UserGeneralResponse } from '../../../core/models/response/userGeneralResponse';
import { UserUpdateRequest } from '../../../core/models/request/userUpdateRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  isLoading = true;
  currentUser : UserGeneralResponse;
  formattedCreatedOn : string ;
  formattedUpdatedOn : string;

  private _httpClient = inject(HttpClient);
  private _userApiService = inject(UserApiServiceService); 
  private _dateConverter = inject(CustomDateConverterService);
 


  
ngOnInit(): void {
  this.getCurrentUser();  
}             

getCurrentUser():void{
  this._userApiService.getCurrentUser().subscribe({
    next : (response : ApiResponseModel<UserGeneralResponse>) => { this.currentUser = response.data;
          this.formattedCreatedOn = this._dateConverter.formatLocalDateTime(response.data.createdOn);
          this.formattedUpdatedOn = this._dateConverter.formatLocalDateTime(response.data.updatedOn);
          console.log(this.formattedCreatedOn);              
          console.log(response)
                        },
    error : (error) => {console.log("error getting current user :", error)},
    complete : () => {console.log("get Current User successfull."); this.isLoading=false;}
  })
}

updateCurrentUser(userUpdateData: UserUpdateRequest):void{
  this._userApiService.updateCurrentUser(userUpdateData);
}






}
