import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuth } from '../../../core/models/userAuth';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';
import { ApiResponse } from '../../../core/models/apiResponse';
import { AuthServiceService } from '../../../core/services/AuthService/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent /* implements OnInit */{
  

  user : UserAuth = {email: "" ,
                       password: ""}
  _authService = inject(AuthServiceService);//this is to handle the menu depending on logged in or logged out.
  _publicController : PublicApiServiceService = inject(PublicApiServiceService);
  _router : Router = inject(Router);  
  token : string = ""; 
  // _activatedRoute :ActivatedRoute = inject(ActivatedRoute);
  
  public registrationStatus = false;
  public registrationMessage ="";
  public errorStatus = false;
  
  //On initialization of this component.  
  // ngOnInit(): void {
  //   this._activatedRoute.queryParams.subscribe(
  //     (params)=>{
  //           this.registrationStatus = params['registrationStatus']==='true';
  //           this.registrationMessage = params['registrationMessage'];
  //           this.errorStatus = params['error']==='true';
  //         }
  //   )
  // }//ends ngOnInit


  

onLogin():void{
    this._publicController.userLogin(this.user).subscribe({
        next : (response: ApiResponse)=>{
          this.token = response.data;
        
          /* so that interceptor can know on page reload that which user is active("loggedInUser":userEmail)
            and which token to use for that active("loggedInUser":userEmail) user. */
          localStorage.setItem("loggedInUser", this.user.email); //saving logged_userEmail with "loggedInUser"
          localStorage.setItem(this.user.email, this.token); //saving token with the userEmail as key.
          // this._authService.loggedIn();
        this._authService.loggedIn();
          setTimeout(()=>{
            this._router.navigateByUrl("/user/user-home");
          },300);
          
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


closeRegistrationMessage(){
  this.registrationStatus = false;
  this.errorStatus = false;
}





}//ends class
