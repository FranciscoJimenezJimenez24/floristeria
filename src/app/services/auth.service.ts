// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: Usuario;
  private userRole?: string;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) { }

  // Método para verificar si el token ha caducado
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);

    return this.http.get<Usuario>(`${environment.urlApi}/user`)
      .pipe(
        tap(user => {
          this.user = user;
          this.userRole = user.role; // Asumiendo que el rol está en la propiedad 'role'
        }),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  getUserRole(): string | undefined {
    return localStorage.getItem("role") !!;
  }
}
