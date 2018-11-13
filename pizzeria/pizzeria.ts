declare var require:any;
var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');


class Cliente{
    nombre:string;
    email:string;
}


class Pizza{
    tipo:string;
    size:string;
    precio=0.00;
    constructor(tipo:string,size:string,precio){
        this.precio = precio;
        this.size = size;
        this.tipo = tipo;
    }
}

class Orden{
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

class Pedido{
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

        );
        return precio_unitarios.reduce(
            (a,b)=>{
                return a+b;
            },0
        )
    }
}



// Iniciando datos

const AppendFile = (nombreArchivo, contenido,replace?:boolean)=>{
    // @ts-ignore
    return  new Promise(
        (resolve,reject) => {

            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );

                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            //contenidoArchivo+contenido,
                            replace == true? contenido:contenidoArchivo+contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );
                    }
                }
            );

        }
    );
};
// Cargar datos
const GetData  = (nombreArchivo)=>{
    // @ts-ignore
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                       if (error){
                           reject(error);
                       }else {
                           resolve(contenidoArchivo)
                       }
                }
            );
        }
    )
};
let pizzas=[];
GetData('DataBase/pizzas')
    .then(
        (contenido)=>{

            String(contenido).split(",").forEach(
                (value)=>{
                    pizzas.push(value);
                }
            )

        }
    );


//---------------PREGUNTAS

// preguntas del menu principal
let preguntas_menu_principal = [

    {
        type: "list",
        name: "opciones",
        message: "Que desea hacer?",
        choices: [
            "Ordenar pizza",
            "Salir",

        ],
    },

];

// Preguntas del menu secundario
let preguntas_login = [
    {
        type: "list",
        name: "sesion",
        message: "Entrar como:",
        choices: ['Administrador','Cliente'],
        filter:( val )=>{ return val.toLowerCase(); }
    },

];

let preguntas_login_administrador = [
    {
        type: 'input',
        name: 'nickname',
        message: "nickname",
    },
    {
        type: 'password',
        message: 'User Password:',
        name: 'clave',
        validate: function (answer) {
            if (answer!=='admin') {
                return 'User Password required!';
            }
            return true;
        }
    },
];

let preguntas_crud = [
    {
        type:"list",
        name:"crud_op",
        message:"Que desea hacer",
        choices: ['Consultar Tipos Pizzas','Modificar Tipos Pizzas','Eliminar Pizzas','Ingresar Pizza','salir'],
        validate:(respuesta)=>{
            if(respuesta.crud_op=='salir'){
                return false;
            }else{
                return respuesta
            }
        }
    }
];

let pregunta_actualizar = [
    {
        type:'input',
        name:"old",
        message:"Ingrese tipo de pizza a actualizar?"
    },
    {
        type:'input',
        name:"nuevo",
        message:"Ingrese el nuevo tipo de pizza para reemplazar?"
    }
];

let pregunta_eliminar = [
    {
        type:"input",
        name:'borrar',
        message:"Ingrese tipo de pizza a eliminar?",

    }
];

let pregunta_insertar = [
    {
        type:"input",
        name:'insert',
        message:"Ingrese tipo de pizza a insertar?",

    }
];

let preguntas_menu_secundario = [

    {
        type: "list",
        name: "clase",
        message: "Que clase de pizza",
        choices: pizzas,
        filter:( val )=>{ return val.toLowerCase(); }
    },
    {
        type: "list",
        name: "size",
        message: "Que tamaño",
        choices: ['Familiar $25','Mediana $15','Pequeña $7.5'],
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cuantas necesitas",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type:"confirm",
        name:"seguir",
        message:"Desea algo mas?",
    },

];


// Ejecutar menu_principal
function iniciar() {
    inquirer
        .prompt(preguntas_login)
        .then(
            (respuestas) => {
                if (respuestas.sesion == 'administrador') {
                    // Menu administrador
                    inquirer
                        .prompt(preguntas_login_administrador)
                        .then((respuestas) => {
                                if (respuestas.clave) {
                                    menu_crud();
                                }else {
                                    console.log(respuestas.clave);
                                    iniciar();
                                }
                            }
                        );
                } else {
                    inquirer
                        .prompt(preguntas_menu_principal)
                        .then((respuestas) => {
                                if (respuestas.opciones != 'Salir') {
                                    console.log('Eliga una pizza del menu:')
                                    let pedido = new Pedido();
                                    pedir_pizza(pedido);
                                }
                            }
                        );
                }

            }
        );

}


function menu_crud(){
    inquirer
        .prompt(preguntas_crud)
        .then((respuestas) => {
                if (respuestas.crud_op === 'salir') {
                    console.log(respuestas.clave);
                    iniciar();
                } else {
                    switch (respuestas.crud_op) {
                        case 'Consultar Tipos Pizzas':
                            pizzas.forEach(
                                (valor)=>{
                                        console.log(valor)
                                }
                            );
                            menu_crud();
                            break;
                        case 'Modificar Tipos Pizzas':
                            inquirer
                                .prompt(pregunta_actualizar)
                                .then(
                                    (respuestas) => {
                                        //buscar y reemplazar

                                        pizzas.forEach((element,index,array) => {

                                            if (element == String(respuestas.old)) {
                                                console.log('econtrado');
                                                array[index]= respuestas.nuevo
                                            }
                                            //console.log(`${element},${respuestas.old}`);
                                        });
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(pizzas);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    contenido=contenido+ok+",";
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('DataBase/pizzas',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Eliminar Pizzas':
                            inquirer
                                .prompt(pregunta_eliminar)
                                .then(
                                    (respuestas) => {
                                        //buscar y borrar

                                        pizzas.forEach((element,index,array) => {

                                            if (element == String(respuestas.borrar)) {
                                                console.log('econtrado');
                                                array[index]='';
                                            }
                                            //console.log(`${element},${respuestas.borrar}`);
                                        });
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(pizzas);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    if (ok) {
                                                        contenido = contenido + ok + ",";
                                                    }
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('DataBase/pizzas',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Ingresar Pizza':
                            inquirer
                                .prompt(pregunta_insertar)
                                .then(
                                    (respuestas) => {
                                        pizzas.push(respuestas.insert);
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(pizzas);

                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    if (ok) {
                                                        contenido = contenido + ok + ",";
                                                    }
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('DataBase/pizzas',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                    }

                    //menu_crud();
                }

            }
        );
}


function pedir_pizza(pedido:Pedido) {
    inquirer
        .prompt(preguntas_menu_secundario)
        .then(
            (respuestas)=>{
                let size = respuestas.size.split(" $")[0];
                let precio = parseFloat(respuestas.size.split("$")[1]);
                let pizza = new Pizza(respuestas.clase,size,precio);
                let cantidad = respuestas.cantidad
                pedido.ordenes.push(new Orden(pizza,cantidad));

                if (respuestas.seguir){
                    pedir_pizza(pedido)
                }else {
                    console.log('+-------------------------------------------------+' +
                        '\nDetalle del pedido\n' +
                        '+-------------------------------------------------+\n'+
                        'Pizza       Tamaño      Cantidad    Precio Unitario\n' +
                        '+-------------------------------------------------+')
                    pedido.mostrar_ordenes();
                    console.log("+-------------------------------------------------+");
                    console.log("Total: $",pedido.calcular_total());
                }
            }
        );
}



iniciar();