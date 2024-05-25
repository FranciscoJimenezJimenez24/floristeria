import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-add-ramos',
  templateUrl: './add-ramos.component.html',
  styleUrls: ['./add-ramos.component.css']
})
export class AddRamosComponent {
  ramoForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddRamosComponent>,
              private productoService: ProductoService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.ramoForm = new FormGroup({
      id_producto: new FormControl(),
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      categoria: new FormGroup({
        id_categoria: new FormControl(3), 
        nombre: new FormControl("Ramos") 
      })
    });

  }

  async confirmAdd() {
    if (this.ramoForm.valid) {
      const nuevoProducto = this.ramoForm.value as Producto;
      const response = await this.productoService.crearProducto(nuevoProducto).toPromise();
      if (response) {
        this.snackBar.open("Se creo que el producto", 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response });
      } else {
        this.snackBar.open("Error al añadir el producto.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }
}
