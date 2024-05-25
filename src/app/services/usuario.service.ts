import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios!:Usuario[];
  userLogin!:Usuario;

  constructor(private httpClient: HttpClient) { 
  }

  obtenerUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.urlApi}/user`)
  }

  obtenerUsuarioLogin(username: string| null | undefined): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${environment.urlApi}/user/login`, { username });
  }  

  getUser(idUsuario: number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(environment.urlApi+"/user/"+idUsuario)
      .pipe(
        catchError(this.handleError)
      )
  }

  createUser(user:Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(environment.urlApi+"/user",user)
  }

  updateUser(userRequest:Usuario):Observable<any>
  {
    return this.httpClient.put(environment.urlApi+"/user", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(id:number):Observable<void>{
    return this.httpClient.delete<void>(environment.urlApi+"/user/"+id)
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  getCurrentUser(usuario:Usuario){
    this.userLogin = usuario;
    
  }

}
