import { UserGeneralResponse } from "../userGeneralResponse";

export interface ApiResponseModel<T>{
    timestamp :string,
    message : string,
    status : number,
    data : T

}