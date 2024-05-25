import { Component } from '@angular/core';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  pedidos:Pedido[]=[]

  constructor(private pedidoService:PedidoService){}

  ngOnInit(){
    this.obtenerPedidos();
  }

  private obtenerPedidos(){
    this.pedidoService.getPedidos().subscribe((data)=>{
      this.pedidos=data
    })
  }
}
