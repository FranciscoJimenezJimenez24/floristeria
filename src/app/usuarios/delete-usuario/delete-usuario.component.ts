import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    private usuarioService: UsuarioService,
    private carritoService: CarritoService, // Asegúrate de importar y proporcionar este servicio
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async confirmDelete() {
    try {
      // Eliminar todos los carritos asociados al usuario
      const carritos = await this.carritoService.obtenerCarritoUsuario(this.usuario.id).toPromise();
      for (const carrito of carritos!) {
        await this.carritoService.deleteCarrito(carrito.id_carrito).toPromise();
      }

      // Eliminar el usuario
      await this.usuarioService.deleteUser(this.usuario.id).toPromise();
      this.snackBar.open("Se borró el usuario", 'Cerrar', { duration: 5000 });
      this.dialogRef.close({ ok: true, id: this.usuario.id });
    } catch (error) {
      this.snackBar.open("Error al borrar el usuario", 'Cerrar', { duration: 5000 });
      this.dialogRef.close({ ok: false });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
