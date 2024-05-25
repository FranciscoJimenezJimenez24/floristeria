import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  // Método para verificar si el token ha caducado
  isTokenExpired(token: string): boolean {
    // Utilizamos el servicio JwtHelper para verificar la expiración del token
    return this.jwtHelper.isTokenExpired(token);
  }
}
