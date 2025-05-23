import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, inject, OnInit, Output, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomDateConverterService } from '../../../shared/customDateConverter';
import { UserGeneralResponse } from '../../../core/models/response/userGeneralResponse';
import { UserUpdateRequest } from '../../../core/models/request/userUpdateRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { UserImageUploadRequest } from '../../../core/models/request/userImageUploadRequest';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { API_ENDPOINTS } from '../../../core/constants/apiEndpoints.const';
import { MatButton } from '@angular/material/button';
import { ImageGalleryComponent } from '../../../shared/components/image-gallery/image-gallery.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from '../../../shared/components/modals/update-user/update-user.component';
import { ImageResponse } from '../../../core/models/response/imageResponse';
import { NoImageDirective } from '../../../shared/directives/noImageDirective/no-image.directive';
import { DateConverterPipe } from '../../../shared/pipes/dateConverter/date-converter.pipe';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule, MatButton, ImageGalleryComponent,  NoImageDirective, DateConverterPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  isLoading = true;
  currentUser : UserGeneralResponse;
  formattedCreatedOn : string ;
  formattedUpdatedOn : string;

  /* emitting that new image is added to the imageGalleryComponent*/
  // @Output() imagedAdded = new EventEmitter<boolean>(true);
  @ViewChild(ImageGalleryComponent) imageGallery !: ImageGalleryComponent


  // baseUrl = API_ENDPOINTS.imageBaseUrl;
  private _userApiService = inject(UserApiServiceService); 
  private _dateConverter = inject(CustomDateConverterService);
  private _toastrService = inject(ToastrService);
  userProfileImageRequest = new UserImageUploadRequest();
  // imageResponseList : Array<ImageResponse> = [];
  completeImageUrl : string ="";

  _modalService = inject(BsModalService);
  bsModalRef ?: BsModalRef;

  /* Receiving the event status from imageGallery*/
  areImagesPresentInGallery :boolean = true ;

 


  
ngOnInit(): void {
  this.getCurrentUser();  
}             







getCurrentUser():void{
  this._userApiService.getCurrentUser().subscribe({
    next : (response : ApiResponseModel<UserGeneralResponse>) => { 
          this.currentUser = response.data;
          this.formattedCreatedOn = this._dateConverter.formatLocalDateTime(response.data.createdOn);
          this.formattedUpdatedOn = this._dateConverter.formatLocalDateTime(response.data.updatedOn);
          this.completeImageUrl = `${response.data.imageUrl}`;
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
    this.userProfileImageRequest.imageName = fileName;
    this.userProfileImageRequest.imageFile = file;

    this._userApiService.updateProfilePicture(this.userProfileImageRequest).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        this.getCurrentUser();
        this._toastrService.success("Profile Image Updated Successfully");
        this.imageGallery.getAllImagesOfCurrentUser();
        
      },
      error : (error)=>{
        console.log("Error updating the profile Picture", error);
        this._toastrService.error("Unable To Update Profile Picture");
      },
      complete : ()=>{
        console.log("Successfuly updated profile image");
      }
    })


  }
}



  openUpdateModal(email : string) :void{
    this.bsModalRef = this._modalService.show(UpdateUserComponent, {
      initialState: {
        openUpdateModal : true,
        userEmail : email
      }
    })
  }








  checkingImagesInGallery(hasImages : boolean): void{
    this.areImagesPresentInGallery = hasImages;
  }


}// ends class.



