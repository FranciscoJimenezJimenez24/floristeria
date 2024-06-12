import { Cliente } from "./cliente";

export interface Pedido {
    id_pedido:number,
    cliente:Cliente,
    total:number,
    fecha:Date,
}
