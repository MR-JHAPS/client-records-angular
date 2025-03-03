import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';
import { UserAuth } from '../../../core/models/userAuth';
import { PublicApiServiceService } from '../../../core/services/public-api/public-api-service.service';

@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  

  user : UserAuth = {email: "" ,
                       password: ""}

  _publicController : PublicApiServiceService = inject(PublicApiServiceService);
  _userService : UserServiceService = inject(UserServiceService); // In this service we store the localStorage KeyName when logging in.
  _router : Router = inject(Router);  
  token : string = ""; 
  _activatedRoute :ActivatedRoute = inject(ActivatedRoute);
  
  public registrationStatus = false;
  public registrationMessage ="";
  public errorStatus = false;
  
  //On initialization of this component.  
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(
      (params)=>{
            this.registrationStatus = params['registrationStatus']==='true';
            this.registrationMessage = params['registrationMessage'];
            this.errorStatus = params['error']==='true';
          }
    )
  }//ends ngOnInit


onLogin():void{
    this._publicController.userLogin(this.user).subscribe({
        next : (response)=>{
          this.token = response.data;
          localStorage.setItem(this.user.email, this.token);

          /* Here we are setting the _userService.email  
             because we have set the userEmail as the 
             key of token in localStorage so to use it in 
             interceptor to get the specific token and pass
             it in a header in each request we need this email.
           */
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


closeRegistrationMessage(){
  this.registrationStatus = false;
  this.errorStatus = false;
}





}//ends class
