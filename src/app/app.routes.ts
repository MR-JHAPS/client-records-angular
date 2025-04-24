import { Routes } from '@angular/router';
import { HomeComponent } from './pages/index/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { ClientUpdateComponent } from './pages/user/client-update/client-update.component';
import { SelectedClientComponent } from './pages/user/selected-client/selected-client.component';
import { CheckComponent } from './pages/check/check.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { ClientTableComponent } from './shared/components/tables/client-table/client-table.component';
import { adminGuardGuard } from './core/auth/guards/adminGuard/admin-guard.guard';
import { userGuardGuard } from './core/auth/guards/userGuard/user-guard.guard';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { ClientLogTableComponent } from './shared/components/tables/client-log-table/client-log-table.component';

export const routes: Routes = [
    {path: "",  component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
   
    {path: "check", component:CheckComponent},

    /* Here I am creating a children paths so that I can implement AuthGuard in one parentPath instead of each children class. */
    {
     path: "user",
     canActivate : [userGuardGuard],
     canActivateChild : [userGuardGuard], /* Calling a AuthGuard class. */
     children : [ 
            {path: "user-home",
                 component: UserHomeComponent,
                children: [
                    {path: "clientTable", component: ClientTableComponent},
                    {path: "clientLogTable", component: ClientLogTableComponent},
                ]},

            {path: "user-profile", component: UserProfileComponent},
            {path: "client-update/:id", component: ClientUpdateComponent},
            {path: "selected-client", component: SelectedClientComponent},
            {path: "clientTable", component: ClientTableComponent},
            {path: "clientLogTable", component: ClientLogTableComponent},

            
        ]
    },
   
    {
        path: "admin",
        canActivate : [adminGuardGuard],
        canActivateChild : [adminGuardGuard], /* Calling a AuthGuard class. */
        children : [ 
               {path: "admin-home", component: AdminHomeComponent},
               {path: "admin-profile", component: AdminProfileComponent},
              /*  {path: "client-update", component: ClientUpdateComponent},
               {path: "selected-client", component: SelectedClientComponent},
               {path: "clientTable", component: ClientTableComponent}, */
               
           ]
       },

    {path: "forbidden", component: ForbiddenComponent},
    {path: "error", component: ErrorComponent},/* This should always be in the end */
    {path: "**", component: ErrorComponent}
];
