import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginComponent } from '../../pages/auth/login/login.component';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const email = localStorage.getItem("loggedInUser");  //getting the email of active logged in user.
  
  /* getting the saved token from localStorage 
      that is saved during the login.
      using the email obtained above as it is the key of token */
  const token = email? localStorage.getItem(email) : null; 

  //Cloning the request and adding the token saved on localStorage when user logged.
  const newRequest = req.clone(
    { //request contains list of datas.
      setHeaders : { //headers contains list of elements
          "authorization" : `Bearer ${token}` 
        }                
    }
  )
   
  return next(newRequest);
};
