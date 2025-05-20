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
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserTableComponent } from './shared/components/tables/user-table/user-table.component';
import { ClientBinComponent } from './shared/components/tables/client-bin/client-bin.component';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';

export const routes: Routes = [
    {path: "", component : IndexLayoutComponent,
        children : [
            { path:"",  redirectTo: "home", pathMatch: "full" }, //inside Main Layout
            {path: "home", component: HomeComponent},
            {path: "login", component: LoginComponent},
            {path: "register", component: RegisterComponent},
            {path: "check", component:CheckComponent},
        ]
    },


            { path: "user",
            canActivate : [userGuardGuard],
            canActivateChild : [userGuardGuard], /* Calling a AuthGuard class. */
            component : MainLayoutComponent,
            children : [ 
                    {path: "user-home",component: UserHomeComponent,
                        children : [
                            {path:"clientTable", component:ClientTableComponent},
                            {path: "", redirectTo: "clientTable", pathMatch: "full" }
                        ]
                    },
                    {path: "", redirectTo: "user-home", pathMatch: "full" },
                    {path: "user-profile", component: UserProfileComponent},
                    {path: "client-update/:id", component: ClientUpdateComponent},
                    {path: "selected-client", component: SelectedClientComponent},
                    {path: "clientBinTable", component: ClientBinComponent},
                    {path: "clientLogTable", component: ClientLogTableComponent},    
                   ]
            },

            {path: "admin",
            canActivate : [adminGuardGuard],
            canActivateChild : [adminGuardGuard], /* Calling a AuthGuard class. */
            component : MainLayoutComponent,
            children : [ 
                    {path: "admin-home",
                     component: AdminHomeComponent,
                     children : [
                            {path:"clientTable", component:ClientTableComponent},
                            {path:"userTable", component:UserTableComponent},
                            {path: "", redirectTo: "clientTable", pathMatch: "full" }
                        ]
                    },
                    {path: "", redirectTo: "admin-home", pathMatch: "full" },
                    {path: "clientLogTable", component: ClientLogTableComponent},
                    {path: "clientBinTable", component: ClientBinComponent},
                    {path: "admin-profile", component: AdminProfileComponent},
                    {path: "client-update/:id", component: ClientUpdateComponent},
                   ]
            },


            {path: "forbidden", component: ForbiddenComponent},
            {path: "error/:code", component: ErrorComponent},/* This should always be in the end */
            {path: "**", component: ErrorComponent}
          
   
        ]

    

