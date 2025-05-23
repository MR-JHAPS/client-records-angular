import { Component, inject, ViewChild } from '@angular/core';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { UpdateUserComponent } from '../../../shared/components/modals/update-user/update-user.component';
import { AdminServiceService } from '../../../core/services/admin-api/admin-service.service';
import { CustomDateConverterService } from '../../../shared/customDateConverter';
import { ToastrService } from 'ngx-toastr';
import { UserImageUploadRequest } from '../../../core/models/request/userImageUploadRequest';
import { UserAdminResponse } from '../../../core/models/response/userAdminResponse';
import { ImageGalleryComponent } from '../../../shared/components/image-gallery/image-gallery.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminUpdateRequest } from '../../../core/models/request/adminUpdateRequest';
import { UserApiServiceService } from '../../../core/services/user-api/user-api-service.service';
import { DateConverterPipe } from '../../../shared/pipes/dateConverter/date-converter.pipe';
import { NoImageDirective } from '../../../shared/directives/noImageDirective/no-image.directive';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule, FormsModule, MatButton, ImageGalleryComponent,  NoImageDirective, DateConverterPipe],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {



  /* this is required because without this we cannot get the access to the images of image Gallery. */
    @ViewChild(ImageGalleryComponent) imageGallery !: ImageGalleryComponent
  
  
    // baseUrl = API_ENDPOINTS.imageBaseUrl;
    private _adminApiService = inject(AdminServiceService); 
    private _userApiService = inject(UserApiServiceService);
    private _dateConverter = inject(CustomDateConverterService);
    private _toastrService = inject(ToastrService);

    
    userProfileImageRequest = new UserImageUploadRequest();
    completeImageUrl : string ="";
    _modalService = inject(BsModalService);
    bsModalRef ?: BsModalRef;
    /* Receiving the event status from imageGallery*/
    areImagesPresentInGallery :boolean = true ;
    isLoading = true;
    currentAdmin : UserAdminResponse;  
  
   
  
  
    
  ngOnInit(): void {
    this.getCurrentAdmin();  
  }             
  
  
  
  
  
  
  
  getCurrentAdmin():void{
    this._adminApiService.getCurrentAdmin().subscribe({
      next : (response : ApiResponseModel<UserAdminResponse>) => { 
            this.currentAdmin = response.data;
            this.completeImageUrl = `${response.data.profileImageUrl}`;          
            console.log("getting Current User/admin.")
              },
      error : (error) => {
            console.log("error getting current user :", error)
            },
      complete : () => {
        console.log("get Current User successfull."); 
        this.isLoading=false;
      }
    })
  }


  
  updateCurrentAdmin(request:  AdminUpdateRequest ):void{
    this._adminApiService.updateCurrentAdmin(request).subscribe({
      next : (response: ApiResponseModel<string>)=>{
        this._toastrService.success("Admin updated Successfully.");
        console.log("Updating Admin");
      },
      error: (error)=> {
        this._toastrService.error("Error! Unable to Update admin");
        console.log("Error occured while updating admin");
      },
      complete : ()=> {
        console.log("Admin updated Succcessfully");
      }
    })
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
          this.getCurrentAdmin();
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
  
  

}//ends class
