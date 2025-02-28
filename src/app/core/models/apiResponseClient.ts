import { apiLinksModel } from "./apiLinksModel"
import { ApiPageModel } from "./apiPageModel"
import { ClientDto } from "./clientDto"

export interface apiResponseClient{

    
        message : string,
        status : string,
        data : {
                links:{ //this contains the link of pagination ("currentPage, firstPage, lastPage, nextPage")
                    linkList : Array<apiLinksModel>
                },

                content : {
                    clientList: Array<ClientDto>
                },

                page:{ // this contains the page info and the total element's details, pages details
                    pageInfo : ApiPageModel     
                }
            }

    


}