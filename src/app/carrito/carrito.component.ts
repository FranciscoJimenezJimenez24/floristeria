import { Component } from '@angular/core';
import { Carrito } from '../interfaces/carrito';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  carrito:Carrito[] = [];
  id = Number(localStorage.getItem("id"))

  admin: boolean = false;
  user: boolean = false;
  worker: boolean = false;

  rol:string | null= localStorage.getItem("role");

  constructor(private carritoService:CarritoService,private router: Router, private pedidoService:PedidoService,private snackBar: MatSnackBar ){}

  ngOnInit(){
    this.roleUsuario();
    this.obtenerCarrito();
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

  private obtenerCarrito(){
    this.carritoService.obtenerCarritoUsuario(this.id).subscribe((carrito:Carrito[])=>{
      this.carrito = carrito;      
    });
  }

  plus(item: Carrito) {
    if (item.numProductos + 1 <= item.producto.stock) {
      item.numProductos++;
      this.actualizarCantidad(item);
    } else {
      alert("No hay suficiente stock disponible para este producto.");
    }
  }

  subtract(item: Carrito) {
    if (item.numProductos > 1) {
      item.numProductos--;
      this.actualizarCantidad(item);
    } else if (item.numProductos === 1) {
      this.eliminarItem(item);
    }
  }

  private actualizarCantidad(item: Carrito) {
    this.carritoService.updateCarrito(item,item.id_carrito).subscribe(() => {
      this.obtenerCarrito();
    });
  }

  private eliminarItem(item: Carrito) {
    this.carritoService.deleteCarrito(item.id_carrito).subscribe(() => {
      this.snackBar.open('El producto ha sido eliminado del carrito.', 'Cerrar', {
        duration: 5000,
      });
      this.obtenerCarrito();
    });
  }

  public realizarPedido(){
    var total:number = 0;
    for (let i=0;i<this.carrito.length;i++){
      total += this.carrito[i].numProductos * Number(this.carrito[i].producto.precio);
    }
    localStorage.setItem("total",total.toString())
    if (this.carrito.length > 0){
      this.pedidoService.setCanProceed(true); // Permitir el acceso a la ruta
      this.router.navigate([`/realizar-pedido`]);
    }
  }

}
