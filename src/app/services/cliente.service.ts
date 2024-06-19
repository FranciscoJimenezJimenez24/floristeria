import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseURL = "http://localhost:8080/api/v1/cliente"

  constructor(private http: HttpClient) { }

  createCliente(nuevoCliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseURL}`, nuevoCliente);
  }

  getAllClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.baseURL}`);
  }

  // Id. de Objeto/Aplicación de la administración: c44b4083-3bb0-49c1-b47d-974e53cbdf3c
}
