import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, NavigationBehaviorOptions, RedirectCommand, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthServiceService } from "../services/AuthService/auth-service.service";
import { catchError, Observable, of, tap } from "rxjs";
@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate, CanActivateChild{
   
    private _router = inject(Router);
    private _authService = inject(AuthServiceService);
   
   
    /* This returns boolean value that confirms if the user is logged in or not. */
    canActivate(): Observable<boolean |UrlTree> {
        return this._authService.isLoggedIn$.pipe(
            tap(isLoggedIn=>{
                if(!isLoggedIn){
                    this._router.navigateByUrl('login');
                }//ends if
                return true;
            })//ends tap
        
        // ,
        // catchError((error) => {
        //   console.error('Auth validation error:', error);
        //   this._authService.clearAuthState(); // Clear invalid token
        //   return of(this._router.createUrlTree(['/login']));
        // })
      );
    }

    /* This is to incorporate in app.route.ts for child paths. */
    canActivateChild(): Observable<boolean | UrlTree> {
        return this.canActivate();
    }

}