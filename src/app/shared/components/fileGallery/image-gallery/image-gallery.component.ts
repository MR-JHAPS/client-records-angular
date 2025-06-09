import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FileResponse } from '../../../../core/models/response/fileResponse';
import { CommonModule, NgIf } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SelectedImageComponent } from '../../modals/selected-image/selected-image.component';
import { BulkImageDeleteRequest } from '../../../../core/models/request/bulkImageDeleteRequest';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { FileRequest } from '../../../../core/models/request/fileRequest';


@Component({
  selector: 'app-image-gallery',
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent {

  _toastrService = inject(ToastrService);
  fileResponseList : Array<FileResponse>  = []; //stores all types of file(images/documents from the apiResponse)
  isLoading = true;
  /* This is the message if images are not found */
  errorMessage = ""; 
  bsModalref?: BsModalRef;
  _modalService = inject(BsModalService);
  checkedImages = new BulkImageDeleteRequest(); //holds the checked-Box ImageId
  isImageSelected = false; /* to see if the multiple/single images are selected for deletion. */
  fileRequest = new FileRequest();
  isImagePresent = false;  /* checks if the Image-gallery is empty */


  @Output() hasImagesEmitter = new EventEmitter<boolean>(); 
  @Output() imagesToDeleteEmitter = new EventEmitter<BulkImageDeleteRequest>();
  @Output() imageToUploadEmitter = new EventEmitter<FileRequest>();

  //receives the imagelist from the galleryContainer component.
  @Input() imageOnlyListChild : FileResponse[] = [] ; // Stores only images extracted from apiResponse;

  





  //on delete button click emits the id list.
  emitDeleteSelectedImages():void{
    this.imagesToDeleteEmitter.emit(this.checkedImages);
    this.isImageSelected = false;
  }

  //On cancel-delete or reset-Selected.
   emitResetSelectedImages(){
    this.checkedImages.idList = [];
    this.isImageSelected = false;
    this.imagesToDeleteEmitter.emit(this.checkedImages);
  }

  emitUploadNewImage(event : Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
        const file = input.files[0];
        const fileName = file.name;
        this.fileRequest.file = file;
        this.fileRequest.fileName = fileName;
        this.imageToUploadEmitter.emit(this.fileRequest);
    }  
  }



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

  // emitResetSelectedImages(){
  //   this.checkedImages.idList = [];
  //   this.isImageSelected = false;
  //   this.sle
  // }




}//ends class
