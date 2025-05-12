import { DatePipe, formatDate } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { format } from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class CustomDateConverterService{

    private datePipe = inject(DatePipe);

    private readonly dateFormat = "medium";
    private readonly locale = "en-US";

    public formatLocalDateTime(date: Date) : string {

       return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') ?? '';
      //  if(!rawDate){
      //   return "";
      //  }
      //  const date = (typeof rawDate === 'string') 
      //               ? new Date(rawDate) : rawDate;
      //  return formatDate(date, this.dateFormat, this.locale);


    }



}