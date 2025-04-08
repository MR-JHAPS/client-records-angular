import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { format } from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class CustomDateConverterService{

    private readonly dateFormat = "medium";
    private readonly locale = "en-US";

    public formatLocalDateTime(rawDate: string | Date) : string {
       if(!rawDate){
        return "";
       }

       const date = (typeof rawDate === 'string') 
                    ? new Date(rawDate) : rawDate;
       return formatDate(date, this.dateFormat, this.locale);


    }



}