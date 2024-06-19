import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {
  usuarioForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUsuarioComponent>,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      id: new FormControl(this.data.id),
      username: new FormControl(this.data.username, [Validators.required,this.usernameValidator]),
      firstname: new FormControl(this.data.firstname, [Validators.required]),
      lastname: new FormControl(this.data.lastname, [Validators.required]),
      country: new FormControl(this.data.country, Validators.required),
      rol: new FormControl(this.data.rol, Validators.required),
    });
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const username = control.value;
    if (username && !username.endsWith('@gmail.com')) {
      return { invalidEmailDomain: true };
    }
    return null;
  }

  async confirmEdit() {
    if (this.usuarioForm.valid) {
      const editedUser = this.usuarioForm.value as Usuario;
      const response = await this.usuarioService.updateUser(editedUser).toPromise();
      if (response) {
        this.snackBar.open("Se edito el usuario", 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response });
      } else {
        this.snackBar.open('Error al editar el usuario', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
