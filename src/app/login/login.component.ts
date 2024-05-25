import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: string = "";
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private loginService: LoginService, 
    private userService: UsuarioService
  ) { }

  ngOnInit(): void { }

  get email() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
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
          this.loginError = errorData;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}
