import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Carrito } from 'src/app/interfaces/carrito';
import { Producto } from 'src/app/interfaces/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-page',
  templateUrl: './producto-page.component.html',
  styleUrls: ['./producto-page.component.css']
})
export class ProductoPageComponent implements OnInit {
  public producto?: Producto;
  carritos: Carrito[] = [];
  id_producto!: number;
  private id_usuario = localStorage.getItem("id");
  cantidad: number = 0;
  productosRelacionados: Producto[] = [];
  indice: number = 0;
  totalProductos: number = 0;
  isAddDisabled: boolean = true; // Añadido

  rol: string | null = localStorage.getItem("role");
  firstname: string | null = localStorage.getItem("firstname");

  admin: boolean = false;
  user: boolean = false;
  worker: boolean = false;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.roleUsuario();
    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          this.id_producto = +params['id'];
          return this.productoService.obtenerProductoPorId(this.id_producto);
        }),
        switchMap(producto => {
          if (!producto) {
            this.router.navigate(['/flores']);
            return of(null); // Return an observable that emits null
          }
          this.producto = producto;
          if (producto.id_categoria) {
            return this.productoService.obtenerProductosPorCategoria(producto.id_categoria);
          } else {
            // this.snackBar.open("No se pudo obtener la categoría del producto.", 'Cerrar', { duration: 5000 });
            return of([]);
          }
        })
      )
      .subscribe(productosRelacionados => {
        if (productosRelacionados) {
          this.productosRelacionados = productosRelacionados;
        }
      }, error => {
        this.snackBar.open("Error al cargar los productos relacionados.", 'Cerrar', { duration: 5000 });
        console.error("Error al cargar los productos relacionados:", error);
      });
  }

  plus() {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
      this.isAddDisabled = this.cantidad === 0; // Actualizar el estado del botón
    } else {
      this.snackBar.open("No se puede añadir más del stock disponible.", 'Cerrar', { duration: 3000 });
    }
  }

  subtract() {
    if (this.cantidad > 0) {
      this.cantidad--;
      this.isAddDisabled = this.cantidad === 0; // Actualizar el estado del botón
      if (this.cantidad === 0 && this.id_usuario) {
        this.eliminarItem();
      }
    } else if (this.cantidad === 0 && this.id_usuario) {
      this.eliminarItem();
    }
  }

  private eliminarItem() {
    if (!this.producto || !this.id_usuario) return;

    this.carritoService.allCarritos().subscribe(data => {
      this.carritos = data;

      const item = this.carritos.find(carrito =>
        carrito.producto.id_producto === this.id_producto &&
        carrito.user.id === Number(this.id_usuario)
      );

      if (item) {
        this.carritoService.deleteCarrito(item.id_carrito).subscribe(
          () => {
            this.snackBar.open('El producto ha sido eliminado del carrito.', 'Cerrar', { duration: 5000 });
            this.cantidad = 0;
          },
          error => {
            this.snackBar.open('Error al eliminar el producto del carrito.', 'Cerrar', { duration: 5000 });
          }
        );
      }
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

  irHome() {
    this.router.navigate(['/']);
  }

  mostrarSiguientes() {
    if (this.indice + 5 < this.totalProductos) {
      this.indice += 5;
    }
  }

  mostrarAnteriores() {
    if (this.indice >= 5) {
      this.indice -= 5;
    }
  }

  seeMore() {
    if (this.producto) {
      this.productoService.obtenerProductosPorCategoria(this.producto.id_categoria).subscribe(productos => {
        const nuevosProductos = productos.slice(this.productosRelacionados.length, this.productosRelacionados.length + 5);
        this.productosRelacionados = this.productosRelacionados.concat(nuevosProductos);
        this.totalProductos = this.productosRelacionados.length;
      });
    }
  }

  addCarrito() {
    if (!this.id_usuario) {
      this.snackBar.open("Usuario no autenticado.", 'Cerrar', { duration: 5000 });
      return;
    }

    if (this.producto && this.cantidad > this.producto.stock) {
      this.snackBar.open("La cantidad seleccionada supera el stock disponible.", 'Cerrar', { duration: 5000 });
      return;
    }

    this.carritoService.allCarritos().subscribe(data => {
      this.carritos = data;

      let existe = false;
      for (let i = 0; i < this.carritos.length; i++) {
        const carritoExistente = this.carritos[i];

        if (carritoExistente.producto.id_producto === this.id_producto && carritoExistente.user.id === Number(this.id_usuario)) {
          const nuevaCantidad = carritoExistente.numProductos + this.cantidad;

          if (this.producto && nuevaCantidad > this.producto.stock) {
            this.snackBar.open("La cantidad total supera el stock disponible.", 'Cerrar', { duration: 5000 });
            return;
          }

          carritoExistente.numProductos = nuevaCantidad;

          this.carritoService.updateCarrito(carritoExistente, carritoExistente.id_carrito).subscribe(
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
          user: { id: Number(this.id_usuario) } as any, // debes completar el objeto Usuario según tu interfaz
          producto: { id_producto: this.id_producto } as any, // debes completar el objeto Producto según tu interfaz
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
