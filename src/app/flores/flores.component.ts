import { Component, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddFloresComponent } from './add-flores/add-flores.component';
import { EditFloresComponent } from './edit-flores/edit-flores.component';
import { DeleteFloresComponent } from './delete-flores/delete-flores.component';
import { Permises } from '../interfaces/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flores',
  templateUrl: './flores.component.html',
  styleUrls: ['./flores.component.css']
})
export class FloresComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  productos:Producto[]=[];
  permises!: Permises;
  displayedColumns!: string[];
  rol:string | null= localStorage.getItem("role");
  firstname: string | null= localStorage.getItem("firstname");

  admin: boolean = false;
  user: boolean = false;
  worker: boolean = false;

  constructor(private productoService:ProductoService,public dialog: MatDialog,private overlay: Overlay,private router: Router){}

  ngOnInit(): void{
    this.roleUsuario();
    this.obtenerFlores();
    this.productoService.productos = []; 
  }

  
  role(): boolean {
    return this.rol === "USER";
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

  async obtenerFlores() {
    const RESPONSE = await this.productoService.obtenerProductosPorCategoria(1).toPromise();
    if (RESPONSE !== undefined) {
      this.displayedColumns = ['id_producto', 'nombre', 'descripción', 'precio', 'stock', 'actions'];
      this.productoService.productos = RESPONSE as Producto[];
      this.productos=RESPONSE as Producto[];
      this.dataSource.data = this.productoService.productos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;        
    }
  }

  async addFlor() {
    const dialogRef = this.dialog.open(AddFloresComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.productoService.productos.push(RESP.data);
        this.dataSource.data = this.productoService.productos;
        this.obtenerFlores();
      }
    }
  }

  async editFlor(producto: Producto) {
    const dialogRef = this.dialog.open(EditFloresComponent, {
      data: producto,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.productoService.productos;
        this.obtenerFlores();
      }
    }
  }

  async deleteFlor(producto: Producto) {
    const dialogRef = this.dialog.open(DeleteFloresComponent, { data: producto, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.productoService.productos;
        this.obtenerFlores();
      }
    }
  }


}
