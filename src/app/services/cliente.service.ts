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
}
