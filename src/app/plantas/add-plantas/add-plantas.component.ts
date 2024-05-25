import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-add-plantas',
  templateUrl: './add-plantas.component.html',
  styleUrls: ['./add-plantas.component.css']
})
export class AddPlantasComponent {
  plantaForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPlantasComponent>,
              private productoService: ProductoService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.plantaForm = new FormGroup({
      id_producto: new FormControl(),
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      categoria: new FormGroup({
        id_categoria: new FormControl(2), 
        nombre: new FormControl("Plantas") 
      })
    });

  }

  async confirmAdd() {
    if (this.plantaForm.valid) {
      const nuevoProducto = this.plantaForm.value as Producto;
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
