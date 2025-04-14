import { ApiLinksDetails } from "./apiLinksDetails"
import { ApiPageDetails } from "./apiPageDetails"

export interface ApiResponseModelPaginated<T> {
    
    timestamp :string,
    message : string,
    status : number,
    data : {    
            links: Array<ApiLinksDetails>,
            content : Array<T>,
            page: ApiPageDetails                
        }
}