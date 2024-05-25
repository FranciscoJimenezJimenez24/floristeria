import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Login } from '../interfaces/login';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem('token') !== null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem('token') || '');
  }

  login(credentials: Login): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${environment.urlHost}/auth/login`, credentials, httpOptions).pipe(
      tap((userData) => {
        this.handleLoginSuccess(userData);
      }),
      catchError(this.handleError)
    );
  }

  renewAccessToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}/refresh-token`, { refreshToken }).pipe(
      tap((response) => {
        sessionStorage.setItem('token', response.token);
        this.currentUserData.next(response.token);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    this.currentUserLoginOn.next(false);
  }

  private handleLoginSuccess(userData: any): void {
    localStorage.setItem('token', userData.token);
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('refreshToken', userData.refreshToken);
    this.currentUserData.next(userData.token);
    this.currentUserLoginOn.next(true);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }
}
