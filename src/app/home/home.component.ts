import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  admin: boolean = false;
  user: boolean = false;
  worker: boolean = false;

  rol: string | null = localStorage.getItem("role");
  firstname: string | null= localStorage.getItem("firstname");

  fotos: string[] = ['carusel1.svg', 'carusel2.svg', 'carusel3.svg'];
  indiceFotos: number = 0;
  titleVisible: boolean = false;

  role() {
    switch (this.rol) {
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
    this.showTitleWithDelay();
  }

  irCarrito() {
    this.router.navigate(['/carrito']);
  }

  irCategoriaFlores() {
    this.router.navigate(['/flores']);
  }

  irCategoriaPlantas() {
    this.router.navigate(['/plantas']);
  }

  irCategoriaRamos() {
    this.router.navigate(['/ramos']);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  irUsuario() {
    this.router.navigate(['/user']);
  }

  irPedidos() {
    this.router.navigate(['/pedidos']);
  }

  irHome(){
    this.router.navigate(['/']);
  }

  changeFoto(direction: number) {
    this.titleVisible = false;
    this.indiceFotos = (this.indiceFotos + direction + this.fotos.length) % this.fotos.length;
    this.showTitleWithDelay();
  }

  showTitleWithDelay() {
    setTimeout(() => {
      this.titleVisible = true;
    }, 2000);
  }

  navigateToLocation(): void {
    window.open('https://www.google.com/maps/place/Carrefour/@36.6122423,-4.5153955,17z/data=!3m2!4b1!5s0xd72e3326e3f1299:0x50e90986d195f6f8!4m6!3m5!1s0xd72fb9bffffffff:0x791e7dcf24f85431!8m2!3d36.612238!4d-4.5128206!16s%2Fg%2F1tf25fgb?entry=ttu');
  }
}
