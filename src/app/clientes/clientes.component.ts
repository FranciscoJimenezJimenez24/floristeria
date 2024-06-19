import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../services/usuario.service';
import { Cliente } from '../interfaces/cliente';
import { Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../interfaces/pedido';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../interfaces/carrito';
import { ProductoService } from '../services/producto.service';  // Importa el servicio de productos

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clienteForm!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    public snackBar: MatSnackBar,
    private userService: UsuarioService, 
    private router: Router, 
    private pedidoService: PedidoService,
    private carritoService: CarritoService,
    private productoService: ProductoService  // Añade el servicio de productos al constructor
  ) {}

  rol: string | null = localStorage.getItem("role");
  firstname: string | null= localStorage.getItem("firstname");

  admin: boolean = false;
  user: boolean = false;
  worker: boolean = false;

  ngOnInit() {
    this.roleUsuario();
    this.userService.userLogin
    this.clienteForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null, [Validators.required]),
      cp: new FormControl(null, [Validators.required]),
      user: new FormGroup({
        id: new FormControl(localStorage.getItem("id")),
        username: new FormControl(localStorage.getItem("username")),
        firstname: new FormControl(null),
        lastname: new FormControl(null),
        country: new FormControl(null),
        role: new FormControl(localStorage.getItem("role")),
      }),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl(null, [Validators.required]),
      ciudad: new FormControl(null, [Validators.required]),
      forma_pago: new FormControl(null, [Validators.required]),
    });
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

  async confirmAdd() {
    if (this.clienteForm.valid) {
      const nuevoCliente = this.clienteForm.value as Cliente;
      const response = await this.clienteService.createCliente(nuevoCliente).toPromise();
      if (response) {
        const clientes = await this.clienteService.getAllClientes().toPromise() as Cliente[];
        for (let i = 0; i < clientes.length; i++) {
          if (clientes[i].user.id == nuevoCliente.user.id) {
            const pedido: Pedido = {
              id_pedido: 0,
              cliente: clientes[i],
              total: Number(localStorage.getItem("total")),
              fecha: new Date()
            };
            const responsePedido = await this.pedidoService.createPedidos(pedido).toPromise();
            if (responsePedido) {
              console.log(pedido);

              const tuCarrito = await this.carritoService.obtenerCarritoUsuario(clientes[i].user.id).toPromise() as Carrito[];
              for (let j = 0; j < tuCarrito.length; j++) {
                const item = tuCarrito[j];
                // Resta el stock del producto
                const producto = item.producto;
                producto.stock -= item.numProductos;
                // Actualiza el producto con el nuevo stock
                await this.productoService.actualizarProducto(producto.id_producto, producto).toPromise();
                // Elimina el elemento del carrito
                await this.carritoService.deleteCarrito(item.id_carrito).toPromise();
              }
              localStorage.removeItem("total");
            }
            this.snackBar.open("Se realizó el pedido con éxito", 'Cerrar', { duration: 5000 });
            this.router.navigate(['/']);
            i = clientes.length;
          }
        }
      } else {
        this.snackBar.open("Error al realizar el pedido", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  cancelar() {
    this.router.navigate([`/carrito`])
  }
}
