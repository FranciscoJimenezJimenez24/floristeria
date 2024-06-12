import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FloresComponent } from './flores/flores.component';
import { PlantasComponent } from './plantas/plantas.component';
import { RamosComponent } from './ramos/ramos.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DeleteFloresComponent } from './flores/delete-flores/delete-flores.component';
import { EditFloresComponent } from './flores/edit-flores/edit-flores.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FloresModule } from './flores/flores.module';
import { AddPlantasComponent } from './plantas/add-plantas/add-plantas.component';
import { EditPlantasComponent } from './plantas/edit-plantas/edit-plantas.component';
import { DeletePlantasComponent } from './plantas/delete-plantas/delete-plantas.component';
import { AddRamosComponent } from './ramos/add-ramos/add-ramos.component';
import { EditRamosComponent } from './ramos/edit-ramos/edit-ramos.component';
import { DeleteRamosComponent } from './ramos/delete-ramos/delete-ramos.component';
import { CardComponent } from './components/card/card.component';
import { PuntitosPipe } from './pipe/puntitos';
import { ProductoPageComponent } from './productos/page/producto-page/producto-page.component';
import { AddUsuarioComponent } from './usuarios/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './usuarios/delete-usuario/delete-usuario.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    CategoriasComponent,
    PedidosComponent,
    UsuariosComponent,
    ClientesComponent,
    CarritoComponent,
    FloresComponent,
    PlantasComponent,
    RamosComponent,
    LoginComponent,
    DeleteFloresComponent,
    EditFloresComponent,
    AddPlantasComponent,
    EditPlantasComponent,
    DeletePlantasComponent,
    AddRamosComponent,
    EditRamosComponent,
    DeleteRamosComponent,
    CardComponent,
    PuntitosPipe,
    ProductoPageComponent,
    AddUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    FloresModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
