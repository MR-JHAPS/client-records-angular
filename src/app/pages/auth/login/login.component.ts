import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { AuthServiceService } from '../../../core/auth/services/auth-service.service';
import { UserAuthRequest } from '../../../core/models/request/userAuthRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';


@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent /* implements OnInit */{

  private _authService = inject(AuthServiceService);//this is to handle the menu depending on logged in or logged out.
  private _publicController : PublicApiServiceService = inject(PublicApiServiceService);
  private _router : Router = inject(Router); 
  token : string = "";  // this is placeholder for token response.
  user : UserAuthRequest = new UserAuthRequest();
  
  public registrationStatus = false;
  public registrationMessage ="";
  public errorStatus = false;
    

  onLogin():void{
    this._publicController.userLogin(this.user).subscribe({
        next : (response: ApiResponseModel<string>)=>{
          this.token = response.data;
          localStorage.setItem("loggedInUser", this.user.email); //saving logged_userEmail with the "loggedInUser" as key.
          localStorage.setItem(this.user.email, this.token);    //saving token with the userEmail as key.
          console.log("User logged in successfully.", response.data);
          /* Adding time delay to route to the user home.*/
          // setTimeout(()=>{
          const roles = this._authService.getRoleFromtoken(this.token);
            if(roles.includes("admin")){
              this._router.navigateByUrl("admin/admin-home");
            }else{
              this._router.navigateByUrl("user/user-home");
            }
          // },300);
          this._authService.updateAuthState(this.token);
        },   
        error : (error) =>{
          console.log("something went wrong : " + error)
          this.errorStatus=true;
        },
        complete : () => {
          console.log("completed")
        }


    })
  }


closeRegistrationMessage(){
  this.registrationStatus = false;
  this.errorStatus = false;
}





}//ends class
