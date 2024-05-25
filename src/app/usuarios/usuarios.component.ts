import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Permises } from '../interfaces/api-response';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  usuarios:Usuario[]=[];
  permises!: Permises;
  displayedColumns!: string[];

  constructor(private usuarioService:UsuarioService,public dialog: MatDialog,private overlay: Overlay,){}

  ngOnInit(): void{
    this.obtenerUsuarios();
    this.usuarioService.usuarios = []; 
  }

  async obtenerUsuarios() {
    const RESPONSE = await this.usuarioService.obtenerUsuarios().toPromise();
    if (RESPONSE !== undefined) {
      this.displayedColumns = ['id_usuario', 'username', 'firstname', 'rol', 'actions'];
      this.usuarioService.usuarios = RESPONSE as Usuario[];
      this.usuarios=RESPONSE as Usuario[];
      this.dataSource.data = this.usuarioService.usuarios;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;        
    }
  }

  async addUsuario() {
    const dialogRef = this.dialog.open(AddUsuarioComponent, { width: '500px', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.usuarioService.usuarios.push(RESP.data);
        this.dataSource.data = this.usuarioService.usuarios;
        this.obtenerUsuarios();
      }
    }
  }

  async editUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      data: usuario,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.usuarioService.usuarios;
        this.obtenerUsuarios();
      }
    }
  }

  async deleteUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(DeleteUsuarioComponent, { data: usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.dataSource.data = this.usuarioService.usuarios;
        this.obtenerUsuarios();
      }
    }
  }
}
