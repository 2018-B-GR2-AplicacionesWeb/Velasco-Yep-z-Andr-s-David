export  class Cliente{
    nombre:string;
    email:string;
}


export  class Pizza{
    tipo:string;
    size:string;
    precio=0.00;
    constructor(tipo:string,size:string,precio){
        this.precio = precio;
        this.size = size;
        this.tipo = tipo;
    }
}

export  class Orden{
    pizza:Pizza;
    cantidad;
    valor_detalle=0.0;
    constructor(pizza:Pizza,cantidad:Number) {
        this.pizza = pizza;
        this.cantidad=cantidad;
        this.valor_detalle=this.cantidad*this.pizza.precio;
    }
    public toString = () : string => {
        let espacios:string = "            ";
        return `${this.pizza.tipo}${espacios.substring(this.pizza.tipo.length)}${this.pizza.size}${espacios.substring(this.pizza.size.length)}${this.cantidad}${espacios.substring(String(this.cantidad).length)}${this.pizza.precio}`;
    }
}

export class Pedido{
    cliente:Cliente;
    ordenes:Orden[]=[];
    mostrar_ordenes(){
        this.ordenes.forEach(

            (orden)=>{

                console.log(orden.toString())


            }
        );
    };
    calcular_total(){
        let precio_unitarios=this.ordenes.map(
            (valor)=>{
                return valor.valor_detalle
            }

        )
        return precio_unitarios.reduce(
            (a,b)=>{
                return a+b;
            },0
        )
    }
}
