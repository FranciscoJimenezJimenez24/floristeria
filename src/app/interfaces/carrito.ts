import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface Carrito {
    id_carrito: number;
    user: Usuario;
    producto: Producto;
    numProductos: number;
  }
  
