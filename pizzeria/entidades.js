export class Cliente {
}
export class Pizza {
    constructor(tipo, size, precio) {
        this.precio = 0.00;
        this.precio = precio;
        this.size = size;
        this.tipo = tipo;
    }
}
export class Orden {
    constructor(pizza, cantidad) {
        this.valor_detalle = 0.0;
        this.toString = () => {
            let espacios = "            ";
            return `${this.pizza.tipo}${espacios.substring(this.pizza.tipo.length)}${this.pizza.size}${espacios.substring(this.pizza.size.length)}${this.cantidad}${espacios.substring(String(this.cantidad).length)}${this.pizza.precio}`;
        };
        this.pizza = pizza;
        this.cantidad = cantidad;
        this.valor_detalle = this.cantidad * this.pizza.precio;
    }
}
export class Pedido {
    constructor() {
        this.ordenes = [];
    }
    mostrar_ordenes() {
        this.ordenes.forEach((orden) => {
            console.log(orden.toString());
        });
    }
    ;
    calcular_total() {
        let precio_unitarios = this.ordenes.map((valor) => {
            return valor.valor_detalle;
        });
        return precio_unitarios.reduce((a, b) => {
            return a + b;
        }, 0);
    }
}
