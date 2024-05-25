import { Component } from '@angular/core';
import { Carrito } from '../interfaces/carrito';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  carrito:Carrito[] = [];
  id = Number(localStorage.getItem("id"))

  constructor(private carritoService:CarritoService,private router: Router){}

  ngOnInit(){
    this.obtenerCarrito();
  }

  private obtenerCarrito(){
    this.carritoService.obtenerCarritoUsuario(this.id).subscribe((carrito:Carrito[])=>{
      this.carrito = carrito;

    });
  }

  plus(item: Carrito) {
    item.numProductos++;
    this.actualizarCantidad(item);
  }

  subtract(item: Carrito) {
    if (item.numProductos > 0) {
      item.numProductos--;
      this.actualizarCantidad(item);
    }
  }

  private actualizarCantidad(item: Carrito) {
    this.carritoService.updateCarrito(item,item.id_carrito).subscribe(() => {
      this.obtenerCarrito();
    });
  }

  public realizarPedido(){
    var total:number = 0;
    for (let i=0;i<this.carrito.length;i++){
      total += this.carrito[i].numProductos * Number(this.carrito[i].producto.precio);
    }
    localStorage.setItem("total",total.toString())
    this.router.navigate([`/realizar-pedido`]);
  }

}
