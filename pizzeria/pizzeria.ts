//import {Observable} from "rxjs";

declare var require:any;
var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
const map = require('rxjs/operators').map;
const Cliente = require('./entidades').Cliente;
const Pizza = require('./entidades').Pizza;
const Orden = require('./entidades').Orden;
const Pedido = require('./entidades').Pedido;

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
            (contenido) => {

                String(contenido).split(",").forEach(
                    (value) => {
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
        choices: ['Consultar Tipos Pizzas','Modificar Tipos Pizzas','Eliminar Pizzas','Ingresar Pizza','Consultar Pedidos','Salir\n'],
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
                                    console.log('Error en el login');
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

                            GetData('DataBase/pizzas')
                                .then(
                                    (contenido) => {

                                        String(contenido).split(",").forEach(
                                            (value) => {
                                                console.log(value);
                                            }
                                        )

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
                                        const pizza$ = rxjs.from(pizzas);
                                        pizza$
                                            .pipe(
                                                map(
                                                    (value)=>{
                                                                //console.log(value,respuestas.old);
                                                                if (value == respuestas.old) {
                                                                    pizzas[pizzas.indexOf(value)] = respuestas.nuevo;
                                                                    return pizzas
                                                                }

                                                    }
                                               )
                                            )
                                            .subscribe(
                                                (ok)=>{},
                                                (error)=>{console.log("error:",error)},
                                                ()=>{
                                                    // volver a actualizar la base
                                                    refreshDb();
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

                                        let contenido:string='';
                                        const pizza$ = rxjs.from(pizzas);
                                        pizza$
                                            .pipe(
                                                map(
                                                    (value)=>{
                                                        if (value == respuestas.borrar) {
                                                            pizzas.splice(pizzas.indexOf(value),1);
                                                            return pizzas
                                                        }
                                                    }
                                                )
                                            )
                                            .subscribe(
                                                (ok)=>{},
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    refreshDb();

                                                }
                                            );
                                    }
                                );
                            break;
                        case 'Ingresar Pizza':
                            inquirer
                                .prompt(pregunta_insertar)
                                .then(
                                    (respuestas) => {
                                        pizzas.push(respuestas.insert);
                                        const pizza$ = rxjs.from(pizzas);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{},
                                                (error)=>{console.log("error:",error)},
                                                ()=>{
                                                    // volver a actualizar la base
                                                    refreshDb();

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Consultar Pedidos':
                            GetData('DataBase/facturas')
                                .then(
                                    (contenido) => {

                                        String(contenido).split(",").forEach(
                                            (value) => {
                                                console.log(value);
                                            }
                                        )

                                    }
                                );
                            menu_crud();
                            break;

                    }

                }

            }
        );
}


function refreshDb() {
    let contenido:string='';
    contenido=String(pizzas)
    AppendFile('DataBase/pizzas',contenido,true)
        .then(
            ()=>{
                console.log('contenido actualizado');
                menu_crud();
            }
        );
}
function pedir_pizza(pedido) {
    inquirer
        .prompt(preguntas_menu_secundario)
        .then(
            (respuestas)=>{
                let size = respuestas.size.split(" $")[0];
                let precio = parseFloat(respuestas.size.split("$")[1]);
                let pizza = new Pizza(respuestas.clase,size,precio);
                let cantidad = respuestas.cantidad;
                pedido.ordenes.push(new Orden(pizza,cantidad));

                if (respuestas.seguir){
                    pedir_pizza(pedido)
                }else {
                    let factura='+-------------------------------------------------+\n' +
                        'Detalle del pedido\n'+
                         `Fecha: ${pedido.fecha.toISOString()}\n`+
                        '+-------------------------------------------------+\n'+
                        'Pizza       Tamaño      Cantidad    Precio Unitario\n' +
                        '+-------------------------------------------------+\n'+
                        pedido.mostrar_ordenes()+
                        "+-------------------------------------------------+\n"+
                        `Total: ${pedido.calcular_total()}\n`+
                        '###################################################\n';
                    console.log(factura);
                    AppendFile('DataBase/facturas',factura,false)
                        .then(
                            ()=>{
                                console.log('contenido actualizado');
                                menu_crud();
                            }
                        );
                }
            }
        );
}

iniciar();