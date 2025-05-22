import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

   transform(value: number | string | Date): string {
    if (!value) return 'No Data Available';
    return new Date(value).toLocaleString();
        // let fullDate = new Date(value).toLocaleString();
        // return fullDate.split(",")[1]; 
  }

}
