import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileRequest } from '../../../../core/models/request/fileRequest';
import { FileResponse } from '../../../../core/models/response/fileResponse';
import { BulkImageDeleteRequest } from '../../../../core/models/request/bulkImageDeleteRequest';
import { DynamicDeleteButtonComponent } from "../../dynamic-delete-button/dynamic-delete-button.component";

@Component({
  selector: 'app-document-gallery',
  imports: [DynamicDeleteButtonComponent],
  templateUrl: './document-gallery.component.html',
  styleUrl: './document-gallery.component.css'
})
export class DocumentGalleryComponent {

  @Output() uploadDocumentEmitter = new EventEmitter<FileRequest>();
  @Output() deleteDocumentEmitter = new EventEmitter<BulkImageDeleteRequest>();

  @Input() documentOnlyListChild : FileResponse[];

  documentRequest : FileRequest = new FileRequest();

  checkedDocs : BulkImageDeleteRequest = new BulkImageDeleteRequest() ;

  //this is passed to dynamicDeleteButton Component to show or hide the deleteButton.
  isDocumentSelected = false;


  emitUploadDocuments(event : Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      const file = input.files[0];
      const fileName = file.name;
      this.documentRequest.file = file;
      this.documentRequest.fileName = fileName;
      this.uploadDocumentEmitter.emit(this.documentRequest);
    }
  }


  emitDeleteDocuments():void{
    this.deleteDocumentEmitter.emit(this.checkedDocs);
    this.isDocumentSelected = false;
    this.resetCheckbox();
  }



  toggleCheckBox(id : number):void{
    if(this.checkedDocs.idList.includes(id)){
      const filteredIdList = this.checkedDocs.idList.filter((foundId)=> foundId!==id);
      this.checkedDocs.idList = filteredIdList;
      /** checking if after filtering the idList is empty or not.
       *  This is so that we can show or hide the dynamic delete button.
       */
      this.validationCheckbox(); 
    }else{
      const updatedIdList = [...this.checkedDocs.idList, id];
      this.checkedDocs.idList = updatedIdList;
       this.isDocumentSelected = true;
    }
  }

  /* Verifying if the checkbox is not empty */
  validationCheckbox():void{
    if(this.checkedDocs.idList.length<=0){
      console.log("No Documents Selected in checkbox in Document Gallery");
      this.isDocumentSelected = false;
    }else{
      this.isDocumentSelected = true;
    }
  }

  resetCheckbox(): void{
    this.checkedDocs.idList = [];
    this.isDocumentSelected = false;
  }





}//ends class
