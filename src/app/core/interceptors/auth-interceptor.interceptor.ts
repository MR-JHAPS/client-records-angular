import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { AuthServiceService } from '../services/AuthService/auth-service.service';

export const authInterceptorInterceptor : HttpInterceptorFn = (req, next) => {
  
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = loggedInUser?localStorage.getItem(loggedInUser): null;

  if(token){
    const newRequest = req.clone(
      { //request contains list of datas.(headers, body etc)
        setHeaders : { //headers contains list of elements
          'authorization' : `Bearer ${token}` 
          }                

         
      }
    )
    return next(newRequest);
  }//ends-if

  console.log("auth interceptor token not found");
   
  return next(req);
};


