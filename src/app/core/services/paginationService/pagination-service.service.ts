import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponseClient } from '../../models/apiResponseClient';
import { ApiLinksModel } from '../../models/apiLinksModel';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationServiceService {


  private customMap = new Map<string, string>;
  // private linkList : Array<ApiLinksModel> = [];


  //[{rel:"a",href="aaaaa"},{rel:"b",href:"bbbb"}]    -----> [{rel:a -> href:aaaa},{rel:b -> href:bbb}]
  convertingToHashMap(list: Array<ApiLinksModel> ): Map<string,string>{
    let mappedLink : Map<string, string> =  new Map();  
    list.forEach(element => {
      mappedLink.set(element.rel, element.href);
    });
    return mappedLink;

  }




 /* private links : {[key:string]: [string]} = {}; */

 /*  extractClientLinks(linkList: Array<{rel:string; href:string}>) : {[key:string]:[string]}{
    const links : {[key:string]:[string]} = {};
    linkList.forEach(link => {
      links[link.rel] = [link.href];
    });
    return links;
  }  */

    /* private links : Array<keyPair> = [];

    extractLinksFromList(linkList:Array<ApiLinksModel>): {(rel:string) : (href:string)} {
      linkList.forEach(element => {
        this.links = {(element.rel) : (element.href)};
      });
      return this.links ; // this returns the array objects ---> [{rel, href}]
      //                                  to key:value type --->{rel : href}  value.
    }

 */



}//ends class
