import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor (private router: Router){}

  admin:boolean = false;
  user:boolean = false;
  worker:boolean = false;

  rol:string | null = localStorage.getItem("role")

  role() {
    switch(this.rol){
      case "ADMIN":
        this.admin = true;
        this.user = false;
        this.worker = false;
        break;
      case "USER":
        this.admin = false;
        this.user = true;
        this.worker = false;
        break;
      case "WORKER":
        this.admin = false;
        this.user = false;
        this.worker = true;
        break;
    }
  }

  ngOnInit(): void {
    this.role();
  }

  irCarrito(){
    console.log("Hola");
    
    this.router.navigate([`/carrito`]);
  }

  irCategoriaFlores(){
    this.router.navigate([`/flores`]);
  }
  irCategoriaPlantas(){
    this.router.navigate([`/plantas`]);
  }
  irCategoriaRamos(){
    this.router.navigate([`/ramos`]);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([`/login`])
  }

  irUsuario(){
    this.router.navigate([`/user`])
  }

  irPedidos(){
    this.router.navigate([`/pedidos`])
  }
}
