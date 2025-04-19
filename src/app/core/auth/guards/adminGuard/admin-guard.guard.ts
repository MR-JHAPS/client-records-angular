import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { combineLatest, map, take } from 'rxjs';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);


  return authService.isRoleAdmin$.pipe(
    take(1), //take the first emitted value and complete.
    map(isAdmin => {
      if(isAdmin){
        return true;//allow access.
      }
     
      return router.createUrlTree(["forbidden"]);
    })
  )
  



  /* const authService = inject(AuthServiceService);
  const router = inject(Router);

  return combineLatest([
    authService.isTokenValid$,
    authService.isRoleAdmin$
  ]).pipe(
    take(1),
    map(([isTokenValid, isAdmin]) => {
      if (!isTokenValid) return router.createUrlTree(['/login']);
      if (!isAdmin) return router.createUrlTree(['/forbidden']);
      return true;
    })
  ); */

};
