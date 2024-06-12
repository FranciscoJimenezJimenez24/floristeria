import { Component } from '@angular/core';
import { Pedido } from '../interfaces/pedido';
import { PedidoService } from '../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  pedidos:Pedido[]=[]

  rol:string | null= localStorage.getItem("role");

  admin: boolean = false;
  user: boolean = false;
  worker: boolean = false;

  constructor(private pedidoService:PedidoService, private router:Router){}

  ngOnInit(){
    this.roleUsuario();
    this.obtenerPedidos();
  }

  roleUsuario() {
    switch (this.rol) {
      case "ADMIN":
        this.admin = true;
        this.user = false;
        this.worker = false;
        break;
      case "USER":
        this.admin = false;
        this.user = true;
        this.worker = false;
        break;
      case "WORKER":
        this.admin = false;
        this.user = false;
        this.worker = true;
        break;
    }
  }
  irCarrito() {
    this.router.navigate(['/carrito']);
  }

  irCategoriaFlores() {
    this.router.navigate(['/flores']);
  }

  irCategoriaPlantas() {
    this.router.navigate(['/plantas']);
  }

  irCategoriaRamos() {
    this.router.navigate(['/ramos']);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  irUsuario() {
    this.router.navigate(['/user']);
  }

  irPedidos() {
    this.router.navigate(['/pedidos']);
  }

  irHome(){
    this.router.navigate(['/']);
  }

  private obtenerPedidos(){
    this.pedidoService.getPedidos().subscribe((data)=>{
      this.pedidos=data
    })
  }
}
