import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../interfaces/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedidos!:Pedido[];

  private baseURL = "http://localhost:8080/api/v1/pedido"

  private canProceedToPedido: boolean = false;

  constructor(private http: HttpClient) { }
  
  setCanProceed(value: boolean) {
    this.canProceedToPedido = value;
  }

  getCanProceed(): boolean {
    return this.canProceedToPedido;
  }

  getPedidos():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.baseURL}`);
  }

  createPedidos(pedido:Pedido):Observable<Pedido>{
    return this.http.post<Pedido>(`${this.baseURL}`,pedido);
  }
}
