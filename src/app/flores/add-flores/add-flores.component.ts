import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-add-flores',
  templateUrl: './add-flores.component.html',
  styleUrls: ['./add-flores.component.css']
})
export class AddFloresComponent {
  florForm!: FormGroup;
  selectedFile!: File;
  fileBase64!: string | ArrayBuffer;

  constructor(
    public dialogRef: MatDialogRef<AddFloresComponent>,
    private productoService: ProductoService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.florForm = new FormGroup({
      id_producto: new FormControl(),
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      categoria: new FormGroup({
        id_categoria: new FormControl(1),
        nombre: new FormControl("Flores")
      })
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async confirmAdd() {
    if (this.florForm.valid) {
      const nuevoProducto = this.florForm.value as Producto;
      if (this.selectedFile) {
        try {
          const uploadResponse = await this.productoService.uploadFile(this.selectedFile).toPromise();
          nuevoProducto.foto = uploadResponse.path; // Ajusta esto según la respuesta del servidor
        } catch (error) {
          console.error('Error uploading file', error); // Agregado para depuración
          //console.log("Nombre del servidor floripaco-serverMotorMySQL - Flexible ServerNivel de proceso y tamañoGeneralPurpose Standard_D2ds_v4Nombre de la base de datosfloripaco-databaseRegiónEast USNombre de usuarioxvvufutweaContraseñaqGcll$RQu$Eq$Oa4");
          
          this.snackBar.open("Error al subir el archivo.", 'Cerrar', { duration: 5000 });
          return;
        }
      }

      try {
        const response = await this.productoService.crearProducto(nuevoProducto).toPromise();
        if (response) {
          this.snackBar.open("Se creó el producto", 'Cerrar', { duration: 5000 });
          this.dialogRef.close({ ok: true, data: response });
        } else {
          this.snackBar.open("Error al añadir el producto.", 'Cerrar', { duration: 5000 });
        }
      } catch (error) {
        console.error('Error creating product', error); // Agregado para depuración
        this.snackBar.open("Error al crear el producto.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
