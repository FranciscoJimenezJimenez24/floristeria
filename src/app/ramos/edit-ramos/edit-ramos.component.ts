import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-edit-ramos',
  templateUrl: './edit-ramos.component.html',
  styleUrls: ['./edit-ramos.component.css']
})
export class EditRamosComponent {
  ramoForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRamosComponent>,
    private snackBar: MatSnackBar,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.ramoForm = new FormGroup({
      id_producto: new FormControl(this.data.id_producto),
      nombre: new FormControl(this.data.nombre, Validators.required),
      descripcion: new FormControl(this.data.descripcion, [Validators.required]),
      precio: new FormControl(this.data.precio, [Validators.required]),
      stock: new FormControl(this.data.stock, Validators.required),
      foto: new FormControl(null),
      categoria: new FormGroup({
        id_categoria: new FormControl(3), 
        nombre: new FormControl("Ramos") 
      })
    });
  }

  async confirmEdit() {
    if (this.ramoForm.valid) {
      const editedFlor = this.ramoForm.value as Producto;
      const response = await this.productoService.actualizarProducto(editedFlor.id_producto,editedFlor).toPromise();
      if (response) {
        this.snackBar.open("Se edito el producto", 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response });
      } else {
        this.snackBar.open('Error al editar el producto', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
