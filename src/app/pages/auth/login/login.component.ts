import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { AuthServiceService } from '../../../core/auth/services/auth-service.service';
import { UserAuthRequest } from '../../../core/models/request/userAuthRequest';
import { ApiResponseModel } from '../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from "../../../shared/components/footer/footer.component";


@Component({
  selector: 'app-login',
  imports: [FormsModule, FooterComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private _toastrService = inject(ToastrService);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthServiceService);//this is to handle the menu depending on logged in or logged out.
  private _publicController : PublicApiServiceService = inject(PublicApiServiceService);
  private _router : Router = inject(Router); 
  token : string = "";  // this is placeholder for token response.
  user : UserAuthRequest = new UserAuthRequest();
  
  public registrationStatus = false;
  public registrationMessage ="";
    

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['updated']) {
        this._toastrService.success("Account Updated, Login with new credentials.");
      }
    });
  }




  onLogin():void{
    this._publicController.userLogin(this.user).subscribe({
        next : (response: ApiResponseModel<string>)=>{
          this.token = response.data;
          localStorage.setItem("loggedInUser", this.user.email); //saving logged_userEmail with the "loggedInUser" as key.
          localStorage.setItem(this.user.email, this.token);    //saving token with the userEmail as key.
          console.log("User logged in successfully.", response.data);
          
          const roles = this._authService.getRoleFromtoken(this.token);
            if(roles.includes("admin")){
              this._router.navigateByUrl("admin");
            }else{
              this._router.navigateByUrl("user/user-home");
            }
          
          this._authService.updateAuthState(this.token);
        },   
        error : (error) =>{
          this._toastrService.error("Error! Unable to Login");
          console.log("Login failed: " + error)
        },
        complete : () => {
          console.log("completed")
        }


    })
  }


closeRegistrationMessage(){
  this.registrationStatus = false;
}





}//ends class
