import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { RegisterRequest } from '../interfaces/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `${environment.urlHost}/auth/register`;

  constructor(private httpClient: HttpClient) {}

  registerUser(user: RegisterRequest): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('Backend retornó el código de estado', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
