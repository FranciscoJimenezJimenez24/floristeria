import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseURL = "http://localhost:8080/api/v1/categoria"

  constructor(private httpClient: HttpClient) { 
  }

  obtenerCategoria(id_categoria: number):Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.baseURL}/${id_categoria}`)
  }
}
