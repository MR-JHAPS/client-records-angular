import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FileResponse } from '../../../../core/models/response/fileResponse';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";
import { DocumentGalleryComponent } from "../document-gallery/document-gallery.component";
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { FileRequest } from '../../../../core/models/request/fileRequest';
import { ToastrService } from 'ngx-toastr';
import { BulkImageDeleteRequest } from '../../../../core/models/request/bulkImageDeleteRequest';
import { FileApiService } from '../../../../core/services/fileApi/file-api.service';

@Component({
  selector: 'app-gallery-container',
  imports: [ ImageGalleryComponent, DocumentGalleryComponent],
  templateUrl: './gallery-container.component.html',
  styleUrl: './gallery-container.component.css'
})
export class GalleryContainerComponent implements OnInit{

  /* this is emitted because if the profile image is deleted from gallery the image of userProfile should refresh */
  @Output() imageDeletedEmitter = new EventEmitter<void>();

  private _fileService = inject(FileApiService);
  _toastrService = inject(ToastrService);
  fileRequest = new FileRequest();
  fileResponseList : Array<FileResponse>  = []; //stores all types of file(images/documents from the apiResponse)
  imageOnlyList : FileResponse[] = [] ; // Stores only images extracted from apiResponse;
  documentsOnlyList : FileResponse[] = []; // Stores only documents extracted from apiResponse;
  isLoading = true;
  isImagePresent = false;
  isDocumentPresent = false;
  activeTab = "images"; // stores which tab is active images/documents.


  ngOnInit(): void {
    this.getAllFilesOfCurrentUser();
  }


  getAllFilesOfCurrentUser() : void {
      this._fileService.getAllFilesOfUser().subscribe({
        next : (response : ApiResponseModelPaginated<FileResponse>)=>{
          this.fileResponseList = response.data.content;
          console.log("Fetching all the images of the Current user.");
          console.log(this.fileResponseList);
          this.checkIfContainsImages(); //check if the image is present in apiResponse
          this.checkIfContainsDocuments(); //check if the document is present in apiResponse
  
          this.extractOnlyImages(); //extracts the image and sets it to the imageOnlyList
          this.extractOnlyDocuments(); //extracts the documents and sets it to the documentOnlyList
          // this.imageOnlyList.forEach((image)=>console.log(image));
        },
        error : (error)=>{
          console.log("Error getting All the images of current user.");
          this.isImagePresent = false;
        },
        complete :()=>{
          this.isLoading=false;
          console.log("Successfully fetched All the images of Logged in user.");
        }
      })
    }
  
  
  
        //Checks if the apiResponse contains the imageFiles.
        checkIfContainsImages(){
          if(this.imageOnlyList.length>0){
            this.isImagePresent = true;
          }else{
            this.isImagePresent = false;
          }
        }
  
        //Checks if the apiResponse contains the documentFiles.
        checkIfContainsDocuments(){
          if(this.documentsOnlyList.length>0){
            this.isDocumentPresent = true;
          }else{
            this.isDocumentPresent = false;
          }
        }
  
        extractOnlyImages() : void {
       let imageOnlyList : FileResponse[] = this.fileResponseList
                    .filter( (file) => file.contentType.startsWith("image"))
                    .map( (file) => {
                        return { 
                          contentType : file.contentType,
                          id : file.id,
                          fileName : file.fileName,
                          uploadedAt : file.uploadedAt,
                          fileUrl : file.fileUrl
                        };  //ends return{}
                      }//ends-File {}
                     )//ends-map
                     this.imageOnlyList = imageOnlyList;
                    //  return imageOnlyList;      
      }//ends method
  
  
      extractOnlyDocuments() : void {
       let documentOnlyList : FileResponse[] = this.fileResponseList
                    .filter( (file) => file.contentType.startsWith("application"))
                    .map( (file) => {
                        return { 
                          contentType : file.contentType,
                          id : file.id,
                          fileName : file.fileName,
                          uploadedAt : file.uploadedAt,
                          fileUrl : file.fileUrl
                        };  //ends return{}
                      }//ends-File {}
                     )//ends-map
                     this.documentsOnlyList = documentOnlyList;
                    //  return imageOnlyList;
                     
      }//ends method
  

        uploadNewFile(fileRequest : FileRequest){
           console.log("This is the event emitted to upload a file : " + fileRequest);

          this._fileService.uploadFileForAuthenticatedUser(fileRequest).subscribe({
            next : (response : ApiResponseModel<string>)=>{
              console.log("Uploading  Image.");
              console.log(response);
              this._toastrService.success("Image uploaded Successfully");
            },
            error : (error)=>{
              console.log("Error Uploading image for current user.");
              this._toastrService.error("Error! Image Upload Failed");
            },
            complete :()=>{
              this.isLoading=false;
              console.log("Image Uploaded Successfully.");
              this.getAllFilesOfCurrentUser(); /* reloading images after successful upload.*/
            }
          })
        }



         deleteSelectedImages(event : BulkImageDeleteRequest) :void{
            event.idList.forEach((id)=>{
              console.log("id of the image to be deleted " + id);
            })

            this._fileService.deleteMultipleFilesById(event).subscribe({
              next : (response : ApiResponseModel<string>)=>{
                console.log("Deleting multiple-Selected images.");
                console.log(this.fileResponseList);
                this.imageDeletedEmitter.emit();
              },
              error : (error)=>{
                console.log("Error deleting multiple-Selected the images of current user.");
              },
              complete :()=>{
                this.isLoading=false;
                this._toastrService.success("Images Successfully deleted.");
                console.log("Successfully deleted multiple-selected images of Logged in user.");
                this.getAllFilesOfCurrentUser();
                // this.isImageSelected = false;
              }
            })
          }






}//ends class
