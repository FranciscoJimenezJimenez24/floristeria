import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Carrito } from 'src/app/interfaces/carrito';
import { Producto } from 'src/app/interfaces/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-page',
  templateUrl: './producto-page.component.html',
  styleUrls: ['./producto-page.component.css']
})
export class ProductoPageComponent {
  public producto?: Producto;
  carritos: Carrito[] = [];
  id_producto!: number;
  private id_usuario = localStorage.getItem("id");
  cantidad: number = 0;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          this.id_producto = +params['id'];
          return this.productoService.obtenerProductoPorId(this.id_producto);
        })
      )
      .subscribe(producto => {
        if (!producto) return this.router.navigate(['/flores']);
        this.producto = producto;
        return;
      });
  }

  plus() {
    this.cantidad++;
  }

  subtract() {
    if (this.cantidad > 0) {
      this.cantidad--;
    }
  }

  addCarrito() {
    if (!this.id_usuario) {
      this.snackBar.open("Usuario no autenticado.", 'Cerrar', { duration: 5000 });
      return;
    }

    this.carritoService.allCarritos().subscribe(data => {
      this.carritos = data;

      let existe = false;
      for (let i = 0; i < this.carritos.length; i++) {
        const carritoExistente = this.carritos[i];

        if (carritoExistente.producto.id_producto === this.id_producto && carritoExistente.user.id === Number(this.id_usuario)) {
          carritoExistente.numProductos += this.cantidad;
          
          this.carritoService.updateCarrito(carritoExistente,carritoExistente.id_carrito).subscribe(
            response => {
              this.snackBar.open("Se añadió al carrito", 'Cerrar', { duration: 5000 });
            },
            error => {
              this.snackBar.open("Error al añadir al carrito.", 'Cerrar', { duration: 5000 });
            }
          );
          existe = true;
          break;
        }
      }

      if (!existe) {
        const nuevoCarrito: Carrito = {
          id_carrito: 0,
          user: { id: Number(this.id_usuario) } as any,  // debes completar el objeto Usuario según tu interfaz
          producto: { id_producto: this.id_producto } as any,  // debes completar el objeto Producto según tu interfaz
          numProductos: this.cantidad
        };

        this.carritoService.addProductoAlCarrito(nuevoCarrito).subscribe(
          response => {
            this.snackBar.open("Se añadió al carrito", 'Cerrar', { duration: 5000 });
          },
          error => {
            this.snackBar.open("Error al añadir al carrito.", 'Cerrar', { duration: 5000 });
          }
        );
      }
    });
  }
}
