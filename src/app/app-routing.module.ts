import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FloresComponent } from './flores/flores.component';
import { PlantasComponent } from './plantas/plantas.component';
import { RamosComponent } from './ramos/ramos.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductoPageComponent } from './productos/page/producto-page/producto-page.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PedidosComponent } from './pedidos/pedidos.component';

let rol = localStorage.getItem("role");

let routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },  // Define the home path
  { path: '**', redirectTo: 'login' }
];

if (rol === "USER") {
  routes = [
    { path: '', component: HomeComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'flores', component: FloresComponent },
    { path: 'plantas', component: PlantasComponent },
    { path: 'ramos', component: RamosComponent },
    { path: 'flores/:id', component: ProductoPageComponent},
    { path: 'plantas/:id', component: ProductoPageComponent},
    { path: 'ramos/:id', component: ProductoPageComponent},
    { path: 'realizar-pedido', component: ClientesComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' }
  ];
} else if (rol === "ADMIN") {
  routes = [
    { path: '', component: HomeComponent }, // Ensure home is also included here
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UsuariosComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: '**', redirectTo: 'login' }
  ];
} else if (rol === "WORKER") {
  routes = [
    { path: '', component: HomeComponent }, // Ensure home is also included here
    { path: 'login', component: LoginComponent },
    { path: 'flores', component: FloresComponent },
    { path: 'plantas', component: PlantasComponent },
    { path: 'ramos', component: RamosComponent },
    { path: '**', redirectTo: 'login' }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
