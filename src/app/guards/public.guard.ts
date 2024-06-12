import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

const checkAuthStatus = ():Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAutheticated => console.log('AuthenticatedPublic:', isAutheticated)),
      tap(
        isAutheticated => {
          if (isAutheticated){
            router.navigate(['/'])
          }
        }
      ),
      map(isAuthenticated => !isAuthenticated) // Return the opposite of what we got back
    )
}

export const cantMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch');
    console.log({route, segments});

    return checkAuthStatus();
}
export const cantActivateGuard: CanActivateFn = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => {
        console.log('CanActivate');
        console.log({route,state});

        return checkAuthStatus();
    }
