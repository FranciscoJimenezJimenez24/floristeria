import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 500) {
          // Aquí puedes manejar específicamente el error 500
          console.error('Error 500: Internal Server Error');
          // Puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
        }
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
