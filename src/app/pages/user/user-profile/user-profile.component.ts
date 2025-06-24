import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomDateConverterService } from '../../../shared/customDateConverter';
import { UserGeneralResponse } from '../../../core/models/response/userGeneralResponse';
import { UserUpdateRequest } from '../../../core/models/request/userUpdateRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { UserImageUploadRequest } from '../../../core/models/request/userImageUploadRequest';
import { ToastrService } from 'ngx-toastr';
// import { MatButton } from '@angular/material/button';
import { ImageGalleryComponent } from '../../../shared/components/fileGallery/image-gallery/image-gallery.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateUserComponent } from '../../../shared/components/modals/update-user/update-user.component';
import { NoImageDirective } from '../../../shared/directives/noImageDirective/no-image.directive';
import { DateConverterPipe } from '../../../shared/pipes/dateConverter/date-converter.pipe';
import { RouterLinkActive } from '@angular/router';
import { GalleryContainerComponent } from "../../../shared/components/fileGallery/gallery-container/gallery-container.component";
import { EmailVerifierPipe } from '../../../shared/pipes/emailVerifier/email-verifier.pipe';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule, ImageGalleryComponent, 
      EmailVerifierPipe, NoImageDirective,
     DateConverterPipe, GalleryContainerComponent],
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
  @ViewChild(GalleryContainerComponent) galleryContainer !: GalleryContainerComponent;


  // baseUrl = API_ENDPOINTS.imageBaseUrl;
  private _userApiService = inject(UserApiServiceService); 
  private _dateConverter = inject(CustomDateConverterService); //this is pipe
  // private _emailVerifierPipe = inject(EmailVerifierPipe);
  private _toastrService = inject(ToastrService);

  
  userProfileImageRequest = new UserImageUploadRequest();
  // imageResponseList : Array<ImageResponse> = [];
  completeImageUrl : string ="";
  activeTab = "images";
  _modalService = inject(BsModalService);
  bsModalRef ?: BsModalRef;

  isEmailVerified : boolean;
 

  
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
          this.isEmailVerified = response.data.emailVerified;
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
        this.galleryContainer.getAllFilesOfCurrentUser();
        
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








  // checkingImagesInGallery(hasImages : boolean): void{
  //   this.areImagesPresentInGallery = hasImages;
  // }


}// ends class.



