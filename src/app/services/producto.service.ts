import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos!:Producto[];

  private baseURL = "http://localhost:8080/api/v1/producto"

  constructor(private httpClient: HttpClient) { 
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.baseURL);
  }

  // Método para obtener un producto por su ID
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.baseURL}/${id}`);
  }

  // Método para crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {    
    return this.httpClient.post<Producto>(this.baseURL, producto);
  }

  // Método para actualizar un producto existente
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.httpClient.put<Producto>(`${this.baseURL}/${id}`, producto);
  }

  // Método para eliminar un producto por su ID
  eliminarProducto(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  obtenerProductosPorCategoria(id_categoria: number): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.baseURL}/categoria/${id_categoria}`);
  }
}
