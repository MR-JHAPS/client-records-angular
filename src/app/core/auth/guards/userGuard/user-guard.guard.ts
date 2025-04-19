import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { map, take } from 'rxjs';

export const userGuardGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthServiceService);
    const router = inject(Router);
  
  
    return authService.isRoleUser$.pipe(
      take(1), //take the first emitted value and complete.
      map(isUser => {
        if(isUser){
          return true;//allow access.
        }
        //redirect to forbidden page.
        return router.createUrlTree(["forbidden"]);
      })
    )
};
