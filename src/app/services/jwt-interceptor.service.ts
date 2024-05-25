import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = this.loginService.userToken;

    if (token) {
      req = this.addTokenHeader(req, token);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = sessionStorage.getItem('refreshToken');
      if (refreshToken) {
        return this.loginService.renewAccessToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.token);
            return next.handle(this.addTokenHeader(request, token.token));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.loginService.logout();
            return throwError(error);
          })
        );
      } else {
        this.isRefreshing = false;
        // Manejar la falta de refreshToken
        return throwError('No refresh token available');
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addTokenHeader(request, jwt));
        })
      );
    }
  }
}
