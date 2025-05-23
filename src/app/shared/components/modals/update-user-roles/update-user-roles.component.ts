import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UserAdminResponse } from '../../../../core/models/response/userAdminResponse';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleApiService } from '../../../../core/services/roleApi/role-api.service';
import { ApiResponseModelPaginated } from '../../../../core/models/responseModel/apiResponseModelPaginated';
import { RoleResponse } from '../../../../core/models/response/roleResponse';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../../../../core/services/admin-api/admin-service.service';
import { RoleRequest } from '../../../../core/models/request/roleRequest';
import { ApiResponseModel } from '../../../../core/models/responseModel/apiResponseModel';
import { ToastrService } from 'ngx-toastr';
import { MaterialModules } from '../../../../material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRoleUpdatedCommunicationService} from '../../../services/userRoleUpdatedCommunication/user-role-updated-communication.service';

@Component({
  selector: 'app-update-user-roles',
  imports: [FormsModule, CommonModule, MaterialModules],
  templateUrl: './update-user-roles.component.html',
  styleUrl: './update-user-roles.component.css'
})
export class UpdateUserRolesComponent implements OnInit{

  roleUpdatedCommunication = inject(UserRoleUpdatedCommunicationService);

  userAdmin : UserAdminResponse = {
                        id: 0,
                        profileImageUrl: "",
                        email: "",
                        roles : [],
                        createdOn: new Date(),
                        updatedOn: new Date ()
  }
  
  ;
  private _roleService = inject(RoleApiService);
  private _adminService = inject(AdminServiceService);
  _router = inject(Router);
  _toastrService = inject(ToastrService);
  _modalService = inject(BsModalService);
  selectedRoles : string[] = [];
  roleRequest = new RoleRequest( [] ); // this is the empty role Request
  rolesList : RoleResponse[];
  isLoading = true;


  ngOnInit(): void {
    this.getAllRoles();
  }


  getAllRoles():void{
    this._roleService.getAllRoles().subscribe({
      next : (response: ApiResponseModel<RoleResponse[]>)=>{
        // const responseRole = response.data;
        this.rolesList =response.data;
        console.log(response.data);
        this.isLoading = false;
      },
      error: (error)=>{
        console.log("Error getting all the roles in updateRoleModal", error);
        this.isLoading = false;
      },
      complete : ()=>{
        console.log("Successfully obtained all the available Roles.");
      }
    })
  }


  /* THis is the button click  */
  onUpdateClick(userId : number){
    
    this.updateUserRoles(userId, this.roleRequest);
  }


  updateUserRoles(userId : number, roles : RoleRequest):void{
    this._adminService.updateUserRole(userId, roles).subscribe({
      next : (response : ApiResponseModel<string>)=>{
        this._toastrService.success("User Roles Updated Successfully.");
       
        console.log("sending the update role in communicationService");
        this.roleUpdatedCommunication.updateRoleAsUpdated();
         this._modalService.hide();
        
      },
      error : (error)=>{
        this._toastrService.error("Error! Unable to update user Roles");
        console.log("Error unable to update User Roles", error);
      },
      complete : ()=>{
        console.log("User Role Updated Successfully.");
      }
    })
  }

 /* This is the trial of the select checkbox */

    isHidden = true;

    onOptionClick(){
      this.isHidden = !this.isHidden;
    }



  toggleRole(roleName : string){
    const index = this.roleRequest.roles.indexOf(roleName);
  if (index > -1) {
    this.roleRequest.roles.splice(index, 1);
  } else {
    this.roleRequest.roles.push(roleName);
  }
  }

  
getSelectedRolesLabel(): string {

  return this.roleRequest.roles.length > 0
    ? this.roleRequest.roles.join(' | ')
    : "No Roles Selected"
}
  


}//ends class.
