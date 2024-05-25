import { Usuario } from "./usuario";

export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellidos: string;
    direccion: string;
    cp: number;
    user: Usuario;
    email: string;
    telefono: string;
    ciudad: string;
    forma_pago: string;
  }
  
