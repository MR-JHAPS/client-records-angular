import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { ClientUpdateComponent } from './pages/user/client-update/client-update.component';
import { SelectedClientComponent } from './pages/user/selected-client/selected-client.component';

export const routes: Routes = [
    {path: "",  component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "user-home", component: UserHomeComponent},
    {path: "client-update", component: ClientUpdateComponent},
    {path: "selected-client", component: SelectedClientComponent},



    {path: "forbidden", component: ForbiddenComponent},
    {path: "error", component: ErrorComponent},/* This should always be in the end */
    {path: "**", component: ErrorComponent}
];
