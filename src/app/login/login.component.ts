import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: string = "";
  showPasswordField: boolean = false;
  isLoading: boolean = false;

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  get email() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  showPassword() {
    if (this.email.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.showPasswordField = true;
      }, 3000);
    } else {
      this.loginForm.controls.username.markAsTouched();
      alert("Por favor, ingrese un email válido.");
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";

      this.loginService.login(this.loginForm.value as Login).subscribe({
        next: (userData) => {
          const username: string | null | undefined = this.loginForm.value.username;
          this.userService.obtenerUsuarioLogin(username).subscribe({
            next: (user) => {
              this.userService.getCurrentUser(user);
              localStorage.setItem("id", (user.id).toString());
              localStorage.setItem("username", user.username);
              localStorage.setItem("role", user.role);
              localStorage.setItem("firstname",user.firstname!)

              // Redireccionar después de guardar los datos del usuario
              this.router.navigateByUrl('');
            },
            error: (error) => {
              console.error(error);
              this.loginError = "Error al obtener datos del usuario.";
            }
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = 'Error de conexión con el servidor. Por favor, intente más tarde.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  registrarse() {
    this.router.navigateByUrl('register');
  }
}
