import { Component, inject, OnInit } from '@angular/core';
import { ImageApiService } from '../../../core/services/imageApi/image-api.service';
import { ImageResponse } from '../../../core/models/response/imageResponse';
import { ApiResponseModelPaginated } from '../../../core/models/responseModel/apiResponseModelPaginated';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { NgFor } from '@angular/common';
import { API_ENDPOINTS } from '../../../core/constants/apiEndpoints.const';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SelectedImageComponent } from '../modals/selected-image/selected-image.component';


@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnInit {

  private _imageService = inject(ImageApiService);
  imageBaseUrl = API_ENDPOINTS.imageBaseUrl;
  // completeUrl = Array<string>;
  imageResponseList : Array<ImageResponse>;
  imageResponseSingle : ImageResponse;
  isLoading = true;
  /* This is the message if images are not found */
  errorMessage = ""; 
  bsModalref?: BsModalRef;
  _modalService = inject(BsModalService);


  ngOnInit(): void {
    this.getAllImagesOfCurrentUser();
  }




  getAllImagesOfCurrentUser() :void {
    this._imageService.getAllImagesOfUser().subscribe({
      next : (response : ApiResponseModelPaginated<ImageResponse>)=>{
        this.imageResponseList = response.data.content;
        console.log("Fetching all the images of the Current user.");
        console.log(this.imageResponseList);
      },
      error : (error)=>{
        console.log("Error getting All the images of current user.");
      },
      complete :()=>{
        this.isLoading=false;
        console.log("Successfully fetched All the images of Logged in user.");
      }
    })
  }



  getImagesById( imageId : number): void{
    this._imageService.getImagesById(imageId).subscribe({
      next : (response : ApiResponseModel<ImageResponse>)=>{
        this.imageResponseSingle = response.data;
        console.log("Fetching  image By ID.");
      },
      error : (error)=>{
        console.log("Error getting Selelcted image by id .");
      },
      complete :()=>{
        // this.isLoading=false;
        console.log("Successfully fetched image By id.");
      }
    })
  }



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
  








}//ends class
