import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponseClient } from '../../models/apiResponseClient';
import { ApiLinksModel } from '../../models/apiLinksModel';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {


  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);
  private customMap = new Map<string, string>;


  //converting LinkList to HashMap/Map.
  //[{rel:"a",href="aaaaa"},{rel:"b",href:"bbbb"}]    -----> [{rel:a -> href:aaaa},{rel:b -> href:bbb}]
  convertingToHashMap(list: Array<ApiLinksModel> ): Map<string,string>{
    let mappedLink : Map<string, string> =  new Map();  
    list.forEach(element => {
      mappedLink.set(element.rel, element.href);
    });
    return mappedLink;

  }



  //getting the current page Content of given url:
  setNewPageSize(size:string){
    this._router.navigate([],{
      relativeTo: this._activatedRoute,
      queryParams:  {size: size},
      queryParamsHandling : 'merge'

    })

  }

  setNewPageSizeByUrl(size:number, url: string) : any{
    
    const urlObj = new URL(url);
    const sizeString = size.toString();
    
     urlObj.searchParams.set("size", sizeString);
    // let updatedSize = searchParams.set("size" , sizeString);
     return urlObj.toString();
  

  }







}//ends class
