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
import { RegisterComponent } from './register/register.component';
import { canActivateGuard, canMatchGuard } from './guards/auth.guard';
import { cantActivateGuard, cantMatchGuard } from './guards/public.guard';
import { adminActivateGuard } from './guards/admin.guard';
import { PedidoGuard } from './guards/pedido.guard';
import { NotFoundComponent } from './not-found/not-found.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [cantActivateGuard], canMatch: [cantMatchGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [cantActivateGuard], canMatch: [cantMatchGuard] },
  { path: '', component: HomeComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'flores', component: FloresComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'plantas', component: PlantasComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'ramos', component: RamosComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'flores/:id', component: ProductoPageComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'plantas/:id', component: ProductoPageComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'ramos/:id', component: ProductoPageComponent, canActivate: [canActivateGuard], canMatch: [canMatchGuard] },
  { path: 'user', component: UsuariosComponent, canActivate: [adminActivateGuard] },
  { path: 'pedidos', component: PedidosComponent, canActivate: [adminActivateGuard] },
  { path: 'realizar-pedido', component: ClientesComponent, canActivate: [PedidoGuard] },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
