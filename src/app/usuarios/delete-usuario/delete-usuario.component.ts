import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {
  constructor(public dialogRef: MatDialogRef<DeleteUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async confirmDelete() {
    const RESPONSE = await this.usuarioService.deleteUser(this.usuario.id).toPromise();

    if (RESPONSE !==null) { // Comprueba si RESPONSE y RESPONSE.message son definidos
      this.snackBar.open("Se borró el usuario", 'Cerrar', { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE, data: RESPONSE });
    } else {
      // Maneja el caso donde RESPONSE o RESPONSE.message son undefined
      // Por ejemplo, muestra un mensaje de error o realiza alguna acción adecuada
      this.snackBar.open(RESPONSE, 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }
}
