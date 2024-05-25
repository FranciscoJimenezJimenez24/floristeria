import { Component, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Permises } from '../interfaces/api-response';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { AddPlantasComponent } from './add-plantas/add-plantas.component';
import { EditPlantasComponent } from './edit-plantas/edit-plantas.component';
import { DeletePlantasComponent } from './delete-plantas/delete-plantas.component';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  productos:Producto[]=[];
  permises!: Permises;
  displayedColumns!: string[];
  rol:string | null= localStorage.getItem("role");

  constructor(private productoService:ProductoService,public dialog: MatDialog,private overlay: Overlay,){}

  ngOnInit(): void{
    this.obtenerPlantas();
    this.productoService.productos = []; 
  }

  role(): boolean {
    return this.rol === "USER";
  }

  async obtenerPlantas() {
    const RESPONSE = await this.productoService.obtenerProductosPorCategoria(2).toPromise();
    if (RESPONSE !== undefined) {
      this.displayedColumns = ['id_producto', 'nombre', 'descripción', 'precio', 'stock', 'actions'];
      this.productoService.productos = RESPONSE as Producto[];
      this.productos=RESPONSE as Producto[];
      this.dataSource.data = this.productoService.productos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;        
    }
  }

  async addPlanta() {
    const dialogRef = this.dialog.open(AddPlantasComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.productoService.productos.push(RESP.data);
        this.dataSource.data = this.productoService.productos;
        this.obtenerPlantas();
      }
    }
  }

  async editPlanta(producto: Producto) {
    const dialogRef = this.dialog.open(EditPlantasComponent, {
      data: producto,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.productoService.productos;
        this.obtenerPlantas();
      }
    }
  }

  async deletePlanta(producto: Producto) {
    const dialogRef = this.dialog.open(DeletePlantasComponent, { data: producto, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.productoService.productos;
        this.obtenerPlantas();
      }
    }
  }
}
