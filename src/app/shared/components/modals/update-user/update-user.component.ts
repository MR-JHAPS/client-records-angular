import { Component, inject, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from '../../../../core/auth/services/auth-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { UserUpdateRequest } from '../../../../core/models/request/userUpdateRequest';
import { FormsModule } from '@angular/forms';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { UserApiServiceService } from '../../../../core/services/user-api/user-api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  imports: [ NgIf, CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  private _toastrService = inject(ToastrService);
  private _userService = inject(UserApiServiceService);
  private _authService = inject(AuthServiceService);
  _router = inject(Router);
  _modalService = inject(BsModalService);
  isRoleUser$ : Observable<boolean>;
  isRoleAdmin$ : Observable<boolean>;
  openUpdateModal : boolean = false;
  //Receiving the userEmail  from the (user/admin) ProfileComponent.
  userEmail : string = "";

  isLoading :boolean;
  //This will store the user Data from the html form and we will send to
  userUpdateRequest = new UserUpdateRequest();



  ngOnInit(): void {
    this._authService.initializeAuthState();
    this.isRoleAdmin$ = this._authService.isRoleAdmin$;
    this.isRoleUser$ = this._authService.isRoleUser$;
    this.userUpdateRequest.email = this.userEmail;
    
    /* this._authService.isRoleAdmin$.subscribe(isAdmin=>{
      console.log("IsAdmin : " + isAdmin);
    })

    this._authService.isRoleUser$.subscribe(isUser=>{
      console.log("IsUser : " + isUser);
    }) */
  }


  /* TO show the loading spinner button when updating the user. */
  onUpdateClick(){
    this.isLoading = true;
    setTimeout(()=>{
      this.updateUser()
    }, 2000)
    
  }


  updateUser() : void{
    this._userService.updateCurrentUser(this.userUpdateRequest).subscribe({
      next : (response : ApiResponseModel<string>)=>{
          // this._toastrService.success("User Updated Successfully");
          console.log("Updating Current User.");
      },
      error : (error) =>{
        this.isLoading = false;
        this._toastrService.error("Unable to update the current User");
        console.log("Error updating the current User", error);

      },
      complete  : ()=>{
        this.isLoading = false;
        this._modalService.hide();
        this._router.navigate(["/login"],{
          queryParams : {updated: true}
        });
        // this._toastrService.success("User Updated Successfully");
        
      }
    })
  }







}
