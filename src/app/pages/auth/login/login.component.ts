import { Component, inject } from '@angular/core';
import { ApiModule, ApiResponseObject, ApiResponseOptionalUserDto, ApiResponseString, PublicControllerService, UserDto } from '../../../core/api/client-records-api';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';

@Component({
  selector: 'app-login',
  imports: [ApiModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user : UserDto = {email: "" ,
                       password: ""}

  _publicController : PublicControllerService = inject(PublicControllerService);
  _userService : UserServiceService = inject(UserServiceService); // In this service we store the localStorage KeyName when logging in.
  _router : Router = inject(Router);  
  token : string = "";  




onLogin():void{
    this._publicController.userLogin(this.user).subscribe({
        next : (response:ApiResponseString)=>{
          this.token = response.data||''; // this is because the token is String||undefined for typescript type safety.
          localStorage.setItem(this.user.email, this.token);
          this._userService.setEmail(this.user.email);
          this._router.navigateByUrl("user-home");
          console.log(response.data);
        },   
        error : (error) =>{
          console.log("something went wrong : " + error)
        },
        complete : () => {
          console.log("completed")
        }


    })
}








}//ends class
