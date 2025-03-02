import { ApiLinksModel} from "./apiLinksModel"
import { ApiPageModel } from "./apiPageModel"
import { ClientDto } from "./clientDto"

export interface ApiResponseClient{

    
        message : string,
        status : string,
        data : {
                links: Array<ApiLinksModel>,

                content : Array<ClientDto>,

                page: ApiPageModel
                
                
        }

    


}