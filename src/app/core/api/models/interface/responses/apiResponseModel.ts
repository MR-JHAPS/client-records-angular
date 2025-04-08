import { UserGeneralResponse } from "./userGeneralResponse";

export interface I_ApiResponseModel<T>{
    timestamp :string,
    message : string,
    status : number,
    data : T






}