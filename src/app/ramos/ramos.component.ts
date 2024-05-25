import { Component, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Permises } from '../interfaces/api-response';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { AddRamosComponent } from './add-ramos/add-ramos.component';
import { EditRamosComponent } from './edit-ramos/edit-ramos.component';
import { DeleteRamosComponent } from './delete-ramos/delete-ramos.component';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.component.html',
  styleUrls: ['./ramos.component.css']
})
export class RamosComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  productos:Producto[]=[];
  permises!: Permises;
  displayedColumns!: string[];
  rol:string | null= localStorage.getItem("role");

  constructor(private productoService:ProductoService,public dialog: MatDialog,private overlay: Overlay,){}

  ngOnInit(): void{
    this.obtenerRamos();
    this.productoService.productos = []; 
  }

  role(): boolean {
    return this.rol === "USER";
  }

  async obtenerRamos() {
    const RESPONSE = await this.productoService.obtenerProductosPorCategoria(3).toPromise();
    if (RESPONSE !== undefined) {
      this.displayedColumns = ['id_producto', 'nombre', 'descripción', 'precio', 'stock', 'actions'];
      this.productoService.productos = RESPONSE as Producto[];
      this.productos=RESPONSE as Producto[];
      this.dataSource.data = this.productoService.productos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;        
    }
  }

  async addRamo() {
    const dialogRef = this.dialog.open(AddRamosComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.productoService.productos.push(RESP.data);
        this.dataSource.data = this.productoService.productos;
        this.obtenerRamos();
      }
    }
  }

  async editRamo(producto: Producto) {
    const dialogRef = this.dialog.open(EditRamosComponent, {
      data: producto,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.productoService.productos;
        this.obtenerRamos();
      }
    }
  }

  async deleteRamo(producto: Producto) {
    const dialogRef = this.dialog.open(DeleteRamosComponent, { data: producto, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.productoService.productos;
        this.obtenerRamos();
      }
    }
  }
}
