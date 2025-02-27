import { HttpInterceptorFn } from '@angular/common/http';
import { UserServiceService } from '../services/user-service.service';
import { inject } from '@angular/core';
import { LoginComponent } from '../../pages/auth/login/login.component';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const _userService = inject(UserServiceService);
  const email = _userService.getEmail();  //getting the username that is used while logging in as it is key of localstorage token.
  
  const token = localStorage.getItem("nerazole@gmail.com"); //getting the saved token from localStorage that is saved during the login.

  //Cloning the request and adding the token saved on localStorage when user logged.
  const newRequest = req.clone(
    { //request contains list of datas.
      setHeaders : { //headers contains list of elements
          "authorization" : `Bearer ${token}` 
         /*  "Accept": "application/json" */
        }                
    }
  )
   
  return next(newRequest);
};
