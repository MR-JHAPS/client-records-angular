import { Component, EventEmitter, HostListener, inject, Input, input, Output, signal } from '@angular/core';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PageEvent,MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule, NgFor, MatPaginator, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() pageLinks : ApiLinksDetails[] = []; //Gets the apiLinks from the parentClass.
  @Output() pageUrl =  new EventEmitter<string>(); //Emits the URL of pagination.
  @Output() contentSize = new EventEmitter<number>(); //Emits the ContentSize.

  toastrService = inject(ToastrService);
  isMobile = false;

  /*dynamicContentSize variable that is only used within this component. */
  contentSizeSelf = 10;




    @HostListener("window:resize", [])
    onResize(){
      this.checkScreen();
    }
  
    checkScreen(){
      this.isMobile = window.innerWidth<600 ;
    }
  
    readonly panelOpenState = signal(false);

    /*changing "self","first", "last" ..... to proper url .*/
    changingRelToUrl(rel: string){
      console.log(`button clicked on the pagination on ${rel}`);
      const singleLink = this.pageLinks.find(link=> link.rel===rel);
      if(!singleLink){
        this.toastrService.warning(`${rel} Page Not Found.`)
        console.log(`rel : ${rel} not found in the given pagination request param. paginationComponent.ts`);
      }else{
        const url = singleLink.href;
        this.toSpecificPage(url);
      }
    }


    toSpecificPage(url : string){
      console.log(`Emitting the url ${url} from pagination component.`)
      this.pageUrl.emit(url);
    }



  /* ------------------------------------------FOR CONTENT SIZE---------------------------------------------------------------------- */

  //getting Array of number for content size.
  getcontentSize() : number[]{
    let contentSize : number[] = [] ;
    for(let i=10; i<=50; i+=5){
      contentSize.push(i);
    }
    return contentSize;
  }

  //when the user selects the content size it is emmited.
  onContentSizeChange(){
    // const contentSize = parseInt((event.target as HTMLSelectElement).value);
    // const content = this.contentSize;
    this.contentSize.emit(this.contentSizeSelf);
    console.log(`Emitting ${this.contentSizeSelf} content per page from pagination Component`);
  }



  



}
