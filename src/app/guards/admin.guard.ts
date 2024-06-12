import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, tap, of, map } from "rxjs";
import { AuthService } from "../services/auth.service";

const checkAdminRole = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap(isAuthenticated => {
      const userRole = authService.getUserRole();
      if (!isAuthenticated || userRole !== 'ADMIN') {
        router.navigate(['/']);
      }
    }),
    map((isAuthenticated: any) => isAuthenticated && authService.getUserRole() === 'ADMIN')
  );
};

export const adminMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkAdminRole();
};

export const adminActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAdminRole();
};
