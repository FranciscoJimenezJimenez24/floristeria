import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Cliente } from '../interfaces/cliente';
import { Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../interfaces/pedido';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clienteForm!: FormGroup;

  constructor(private clienteService: ClienteService,public snackBar: MatSnackBar,private userService:UsuarioService, private router: Router, private pedidoService:PedidoService){}
  
  ngOnInit() {
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

  async confirmAdd() {
    if (this.clienteForm.valid) {
      const nuevoCliente = this.clienteForm.value as Cliente;
      const response = await this.clienteService.createCliente(nuevoCliente).toPromise();
      if (response) {
        const pedido:Pedido = {
          id_pedido:0,
          id_cliente:nuevoCliente.id_cliente,
          total:Number(localStorage.getItem("total")),
          fecha: new Date()
        }
        const responsePedido = await this.pedidoService.createPedidos(pedido).toPromise();
        this.snackBar.open("Se realizo el pedido con exito", 'Cerrar', { duration: 5000 });
        this.router.navigate(['/']);
      } else {
        this.snackBar.open("Error al realizar el pedido", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  cancelar(){
    this.router.navigate([`/carrito`])
  }
}
