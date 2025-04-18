import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  getDecodedToken(token: string) : any {
    try {
      return jwtDecode(token);
    }catch(error) {
      console.error("Invalid Token", error);
      return null;
    }
  }
 

  getRole(token : string): Array<string> | null{
   const decodedToken = this.getDecodedToken(token);
   return decodedToken?.role || null;
  }

  getIssuedTime(token:string) : Date | null {
    const decodedToken = this.getDecodedToken(token);
    return decodedToken?.iat || null;
  }

  getExpirationTime(token:string) : Date | null {
    const decodedToken = this.getDecodedToken(token);
    return decodedToken?.exp || null;
  }



}
