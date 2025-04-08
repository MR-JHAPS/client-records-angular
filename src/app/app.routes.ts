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
import { AuthGuard } from './core/guards/authGuard';

export const routes: Routes = [
    {path: "",  component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "check", component:CheckComponent},

    /* Here I am creating a children paths so that I can implement AuthGuard in one parentPath instead of each children class. */
    {
     path: "user",
     canActivateChild : [AuthGuard], /* Calling a AuthGuard class. */
     children : [ 
            {path: "user-home", component: UserHomeComponent},
            {path: "user-profile", component: UserProfileComponent},
            {path: "client-update", component: ClientUpdateComponent},
            {path: "selected-client", component: SelectedClientComponent},
            
        ]
    },
   

    {path: "forbidden", component: ForbiddenComponent},
    {path: "error", component: ErrorComponent},/* This should always be in the end */
    {path: "**", component: ErrorComponent}
];
