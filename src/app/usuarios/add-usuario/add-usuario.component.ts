import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {
  usuarioForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUsuarioComponent>,
              private usuarioService: UsuarioService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      id: new FormControl(0),
      username: new FormControl(null, [Validators.required,this.usernameValidator]),
      password: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
    });

  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const username = control.value;
    if (username && !username.endsWith('@gmail.com')) {
      return { invalidEmailDomain: true };
    }
    return null;
  }

  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value as Usuario;
      const response = await this.usuarioService.createUser(nuevoUsuario).toPromise();
      if (response) {
        this.snackBar.open("Se creo el usuario", 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response });
      } else {
        this.snackBar.open("Error al añadir el usuario.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }
}
