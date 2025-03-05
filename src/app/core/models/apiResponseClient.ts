import { ApiLinksModel} from "./apiLinksModel"
import { ApiPageModel } from "./apiPageModel"
import { ClientDto, I_ClientDto } from "./clientDto"

export interface ApiResponseClient{

        message : string,
        status : string,
        data : {
                links: Array<ApiLinksModel>,
                content : Array<I_ClientDto>,
                page: ApiPageModel                
        }

}//Ends ClientList Interface


export interface ApiResponseSingleClient{
            
        message : string,
        status : string,
        data : I_ClientDto

}
