import { Injectable } from '@angular/core';
import { Carrito } from '../interfaces/carrito';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  carrito!:Carrito
  private baseURL = "http://localhost:8080/api/v1/carrito"
  
  constructor(private httpClient: HttpClient) { }

  obtenerCarritoUsuario(id:number):Observable<Carrito[]>{
    return this.httpClient.get<Carrito[]>(`${this.baseURL}/usuario/${id}`)
  }
  
  allCarritos(): Observable<Carrito[]>{
    return this.httpClient.get<Carrito[]>(`${this.baseURL}`)
  }
  
  addProductoAlCarrito(carrito: Carrito): Observable<Carrito> {    
    return this.httpClient.post<Carrito>(this.baseURL, carrito);
  }
  
  updateCarrito(carro: Carrito,id_carrito:number): Observable<Carrito> {
    console.log(id_carrito);
    console.log(carro);
    
    return this.httpClient.put<Carrito>(`${this.baseURL}/${id_carrito}`, carro);
  }

  deleteCarrito(id_carrito:number):Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/${id_carrito}`)
  }

  
}
