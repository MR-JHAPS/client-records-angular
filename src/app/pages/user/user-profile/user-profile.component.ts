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



updateProfilePicture(event: Event){
  const input = event.target as HTMLInputElement;
  if(input.files && input.files.length > 0){
    const file = input.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();

    //generating unique fileName.
    const uniqueFileName = `profile_${Date.now()}.${fileExtension}`;

    // this.saveImageLocally(file, uniqueFileName).then(()=>{
    //   this.uploadImageBackEnd()
    // })

  }
}



uploadImageBackEnd(file: File,  fileName: string){


}


/*-------------------- Saving image locally------------------------------------------------------*/
  // private saveImageLocally(file: File, fileName: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     // Create a local copy in browser's IndexedDB or localStorage
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       try {
  //         // Save to browser storage (alternative: save to assets folder during development)
  //         localStorage.setItem(`profile_${fileName}`, e.target.result);
  //         resolve();
  //       } catch (err) {
  //         reject(err);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }




  // /* NEED TO STUDY THIS FURTHER : */
  // private saveImageLocally(file: File, userEmail: string, fileName: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       try {
  //         // Create user directory if not exists
  //         const userDir = `${environment.publicAssetsPath}/users/${userEmail}`;
  //         if (!window.require('fs').existsSync(userDir)) {
  //           window.require('fs').mkdirSync(userDir, { recursive: true });
  //         }

  //         // Save file
  //         const fs = window.require('fs');
  //         const path = window.require('path');
  //         const filePath = path.join(userDir, fileName);
          
  //         const buffer = Buffer.from(e.target.result.split(',')[1], 'base64');
  //         fs.writeFile(filePath, buffer, (err: any) => {
  //           if (err) reject(err);
  //           else {
  //             this.currentUser.image = fileName;
  //             this.getCurrentUser();
  //             resolve();
  //           }
  //         });
  //       } catch (err) {
  //         reject(err);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }







}// ends class.



