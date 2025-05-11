import { Component, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { ImageApiService } from '../../../core/services/imageApi/image-api.service';
import { ImageResponse } from '../../../core/models/response/imageResponse';
import { ApiResponseModelPaginated } from '../../../core/models/responseModel/apiResponseModelPaginated';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { API_ENDPOINTS } from '../../../core/constants/apiEndpoints.const';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SelectedImageComponent } from '../modals/selected-image/selected-image.component';
import { BulkImageDeleteRequest } from '../../../core/models/request/bulkImageDeleteRequest';
import { filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ImageRequest } from '../../../core/models/request/imageRequest';


@Component({
  selector: 'app-image-gallery',
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnInit {

  private _imageService = inject(ImageApiService);
  imageBaseUrl = API_ENDPOINTS.imageBaseUrl;
  _toastrService = inject(ToastrService);
  imageResponseList : Array<ImageResponse>  = [];
  imageResponseSingle : ImageResponse;
  isLoading = true;
  /* This is the message if images are not found */
  errorMessage = ""; 
  bsModalref?: BsModalRef;
  _modalService = inject(BsModalService);
  checkedImages = new BulkImageDeleteRequest(); //holds the checked-Box ImageId
  isImageSelected = false;
  imageRequest = new ImageRequest();


  @Output() hasImages = new EventEmitter<boolean>(); 


  ngOnInit(): void {
    this.getAllImagesOfCurrentUser();    
  }




  getAllImagesOfCurrentUser() : void {
    this._imageService.getAllImagesOfUser().subscribe({
      next : (response : ApiResponseModelPaginated<ImageResponse>)=>{
        this.imageResponseList = response.data.content;
        console.log("Fetching all the images of the Current user.");
        console.log(this.imageResponseList);
        this.emitContainsImages();
      },
      error : (error)=>{
        console.log("Error getting All the images of current user.");
        this.emitContainsImages();
      },
      complete :()=>{
        this.isLoading=false;
        console.log("Successfully fetched All the images of Logged in user.");
      }
    })
  }

  emitContainsImages():void{
    this.hasImages.emit(this.imageResponseList.length > 0);
  }



  uploadNewImage(event : Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      const file = input.files[0];
      const fileName = file.name;
      this.imageRequest.imageFile = file;
      this.imageRequest.imageName = fileName;
    }  
    this._imageService.uploadImageForAuthenticatedUser(this.imageRequest).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        console.log("Uploading  Image.");
        console.log(response);
      },
      error : (error)=>{
        console.log("Error Uploading image for current user.");
      },
      complete :()=>{
        this.isLoading=false;
        this._toastrService.success("Images Successfully Uploaded.");
        console.log("Image Uploaded Successfully.");
        this.getAllImagesOfCurrentUser(); /* reloading images after successful upload.*/
      }
    })
  }

  deleteSelectedImages() :void{
    this._imageService.deleteMultipleImageById(this.checkedImages).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        console.log("Deleting multiple-Selected images.");
        console.log(this.imageResponseList);
      },
      error : (error)=>{
        console.log("Error deleting multiple-Selected the images of current user.");
      },
      complete :()=>{
        this.isLoading=false;
        this._toastrService.success("Images Successfully deleted.");
        console.log("Successfully deleted multiple-selected images of Logged in user.");
        this.getAllImagesOfCurrentUser();
        this.isImageSelected = false;
      }
    })
  }

  // getImagesById( imageId : number): void{
  //   this._imageService.getImagesById(imageId).subscribe({
  //     next : (response : ApiResponseModel<ImageResponse>)=>{
  //       this.imageResponseSingle = response.data;
  //       console.log("Fetching  image By ID.");
  //     },
  //     error : (error)=>{
  //       console.log("Error getting Selelcted image by id .");
  //     },
  //     complete :()=>{
  //       // this.isLoading=false;
  //       console.log("Successfully fetched image By id.");
  //     }
  //   })
  // }



  /* Opens the selected image as a Modal. */
  openImage( selectedImageUrl : string, imageName: string) : void{
    console.log("opening Image modal from imageGallery.");
    this.bsModalref = this._modalService.show(SelectedImageComponent,{
      initialState : {
        isImageOpened : true,
        imageUrl : selectedImageUrl,
        imageName : imageName
      }
    })
  }//ends method
  



  /* --------------------------------------------THIS IS FOR THE IMAGE CHECKBOX--------------------------------------------- */


  toggleCheckBox(imageId : number){
    /*
     * we need to update the object.arrayField = this.object.arrayField
     * ... is spreadOperator
     */
    let isPresent = this.doesIdExists(imageId);
    if(isPresent){
     this.checkedImages.idList = this.checkedImages.idList.filter(id=> id!==imageId);
    }else{
      this.checkedImages.idList = [...this.checkedImages.idList, imageId];
    }
    /*checks if the image is selected or not
     * for dynamic delete button. Only appears if image is selected. 
    */
    this.imageSelectionStatus();
  }//ends-method


  /* Checks if the selected ImageId is previously in the selectedImageArray. */
  doesIdExists(id : number) : boolean{
    if(this.checkedImages.idList.includes(id)){
      return true;
    }else{
      return false;
    }
  }


  /* Checks if anyImages are selected in checkbox. */
  imageSelectionStatus(){
    if(this.checkedImages.idList.length>0){
      this.isImageSelected = true;
    }else{
      this.isImageSelected = false;
    }
  }

  resetSelectedImages(){
    this.checkedImages.idList = [];
    this.isImageSelected = false;
  }




}//ends class
