import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailVerifier'
})
export class EmailVerifierPipe implements PipeTransform {

  transform(emailVerified: boolean): string {
    return emailVerified ? "Email Verified" : "Email Not Verified"; 
  }//ends method

}//ends pipe
