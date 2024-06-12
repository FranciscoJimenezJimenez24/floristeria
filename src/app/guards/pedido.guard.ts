import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoGuard implements CanActivate {
  constructor(private pedidoService: PedidoService, private router: Router) {}

  canActivate(): boolean {
    if (this.pedidoService.getCanProceed()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
