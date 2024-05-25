import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-delete-flores',
  templateUrl: './delete-flores.component.html',
  styleUrls: ['./delete-flores.component.css']
})
export class DeleteFloresComponent {

  constructor(public dialogRef: MatDialogRef<DeleteFloresComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async confirmDelete() {
    const RESPONSE = await this.productoService.eliminarProducto(this.producto.id_producto).toPromise();

    if (RESPONSE !==null) { // Comprueba si RESPONSE y RESPONSE.message son definidos
      this.snackBar.open("Se borró el producto", 'Cerrar', { duration: 5000 });
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
