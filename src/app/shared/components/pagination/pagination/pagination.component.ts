import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { ApiLinksDetails } from '../../../../core/models/responseModel/apiLinksDetails';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PageEvent,MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule, NgFor, MatPaginator],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() pageLinks : ApiLinksDetails[] = []; 
  @Output() pageChange =  new EventEmitter<string>();
  @Output() contentSize = new EventEmitter<number>();

  toastrService = inject(ToastrService);

  /*dynamicContentSize variable that is only used within this component. */
  contentSizeSelf = 10;




  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }





  //getting the total number of pages from the apiResponsePaginatedLinks.
  get totalPages() : number{
    if (!this.pageLinks) return 1; // Guard clause
    const lastPageLink =  this.pageLinks.find((links)=> links.rel === "last");
    if(!lastPageLink)return 1;
      const url = new URL(lastPageLink.href);  
      const lastPageNumber = url.searchParams.get("page");
      return lastPageNumber? parseInt(lastPageNumber) : 1 ;
  }


  get currentPage(): number {
    if (!this.pageLinks) return 1; // Guard clause
    const selfLink = this.pageLinks.find(link => link.rel === 'self');
    if (!selfLink) return 1;
    const url = new URL(selfLink.href);
    const pageParam = url.searchParams.get('page');
    return pageParam ? parseInt(pageParam) + 1 : 1; // Convert 0-based to 1-based
  }

  //Generates Array of pageNumbers for html.
  get pageNumbers():number[]{
    const range = 2; // How many pages to show around the current page
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Get the URL for a specific page
  getPageUrl(page: number): string | null {
    const selfLink = this.pageLinks.find(link => link.rel === 'self');
    if (!selfLink) return null;
    const url = new URL(selfLink.href);
    url.searchParams.set('page', String(page - 1)); // Convert to 0-based
    return url.toString();
  }

  goToPage(page: number) {
    const url = this.getPageUrl(page);
    if (url) this.pageChange.emit(url);
  }

    /*changing "self","first", "last" ..... to proper url .*/
    changingRelToUrl(rel: string){
      const singleLink = this.pageLinks.find(link=> link.rel===rel);
      if(!singleLink){
        this.toastrService.warning(`${rel} Page Not Found.`)
      }else{
      const url = singleLink.href;
      this.toSpecificPage(url);
      }
    }


    toSpecificPage(url : string){
      this.pageChange.emit(url);
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
  onContentSizeChange(event : Event){
    const contentSize = parseInt((event.target as HTMLSelectElement).value);
    this.contentSize.emit(contentSize);
  }



}
