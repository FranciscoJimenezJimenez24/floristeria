import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.';
        
        if (error.status === 401) {
          errorMessage = 'Credenciales incorrectas. Por favor, verifique su email y contraseña.';
        } else if (error.status === 500) {
          errorMessage = 'Error del servidor. Por favor, contacte al soporte técnico.';
        } else if (error.status === 502) {
          errorMessage = 'Error de conexión con el servidor. Por favor, intente más tarde.';
        }

        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        return throwError(() => error);
      })
    );
  }
}
