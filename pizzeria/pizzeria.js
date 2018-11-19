//import {Observable} from "rxjs";
var inquirer = require('inquirer');
var rxjs = require('rxjs');
var fs = require('fs');
var map = require('rxjs/operators').map;
var Cliente = require('./entidades').Cliente;
var Pizza = require('./entidades').Pizza;
var Orden = require('./entidades').Orden;
var Pedido = require('./entidades').Pedido;
// Iniciando datos
var AppendFile = function (nombreArchivo, contenido, replace) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile(nombreArchivo, contenido, function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(contenido);
                    }
                });
            }
            else {
                fs.writeFile(nombreArchivo, 
                //contenidoArchivo+contenido,
                replace == true ? contenido : contenidoArchivo + contenido, function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(contenido);
                    }
                });
            }
        });
    });
};
// Cargar datos
var GetData = function (nombreArchivo) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
var pizzas = [];
GetData('DataBase/pizzas')
    .then(function (contenido) {
    String(contenido).split(",").forEach(function (value) {
        pizzas.push(value);
    });
});
//---------------PREGUNTAS
// preguntas del menu principal
var preguntas_menu_principal = [
    {
        type: "list",
        name: "opciones",
        message: "Que desea hacer?",
        choices: [
            "Ordenar pizza",
            "Salir",
        ]
    },
];
// Preguntas del menu secundario
var preguntas_login = [
    {
        type: "list",
        name: "sesion",
        message: "Entrar como:",
        choices: ['Administrador', 'Cliente'],
        filter: function (val) { return val.toLowerCase(); }
    },
];
var preguntas_login_administrador = [
    {
        type: 'input',
        name: 'nickname',
        message: "nickname"
    },
    {
        type: 'password',
        message: 'User Password:',
        name: 'clave',
        validate: function (answer) {
            if (answer !== 'admin') {
                return 'User Password required!';
            }
            return true;
        }
    },
];
var preguntas_crud = [
    {
        type: "list",
        name: "crud_op",
        message: "Que desea hacer",
        choices: ['Consultar Tipos Pizzas', 'Modificar Tipos Pizzas', 'Eliminar Pizzas', 'Ingresar Pizza', 'Consultar Pedidos', 'Salir\n'],
        validate: function (respuesta) {
            if (respuesta.crud_op == 'salir') {
                return false;
            }
            else {
                return respuesta;
            }
        }
    }
];
var pregunta_actualizar = [
    {
        type: 'input',
        name: "old",
        message: "Ingrese tipo de pizza a actualizar?"
    },
    {
        type: 'input',
        name: "nuevo",
        message: "Ingrese el nuevo tipo de pizza para reemplazar?"
    }
];
var pregunta_eliminar = [
    {
        type: "input",
        name: 'borrar',
        message: "Ingrese tipo de pizza a eliminar?"
    }
];
var pregunta_insertar = [
    {
        type: "input",
        name: 'insert',
        message: "Ingrese tipo de pizza a insertar?"
    }
];
var preguntas_menu_secundario = [
    {
        type: "list",
        name: "clase",
        message: "Que clase de pizza",
        choices: pizzas,
        filter: function (val) { return val.toLowerCase(); }
    },
    {
        type: "list",
        name: "size",
        message: "Que tamaño",
        choices: ['Familiar $25', 'Mediana $15', 'Pequeña $7.5']
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cuantas necesitas",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type: "confirm",
        name: "seguir",
        message: "Desea algo mas?"
    },
];
// Ejecutar menu_principal
function iniciar() {
    inquirer
        .prompt(preguntas_login)
        .then(function (respuestas) {
        if (respuestas.sesion == 'administrador') {
            // Menu administrador
            inquirer
                .prompt(preguntas_login_administrador)
                .then(function (respuestas) {
                if (respuestas.clave) {
                    menu_crud();
                }
                else {
                    console.log('Error en el login');
                    iniciar();
                }
            });
        }
        else {
            inquirer
                .prompt(preguntas_menu_principal)
                .then(function (respuestas) {
                if (respuestas.opciones != 'Salir') {
                    console.log('Eliga una pizza del menu:');
                    var pedido = new Pedido();
                    pedir_pizza(pedido);
                }
            });
        }
    });
}
function menu_crud() {
    inquirer
        .prompt(preguntas_crud)
        .then(function (respuestas) {
        if (respuestas.crud_op === 'salir') {
            console.log(respuestas.clave);
            iniciar();
        }
        else {
            switch (respuestas.crud_op) {
                case 'Consultar Tipos Pizzas':
                    GetData('DataBase/pizzas')
                        .then(function (contenido) {
                        String(contenido).split(",").forEach(function (value) {
                            console.log(value);
                        });
                    });
                    menu_crud();
                    break;
                case 'Modificar Tipos Pizzas':
                    inquirer
                        .prompt(pregunta_actualizar)
                        .then(function (respuestas) {
                        //buscar y reemplazar
                        var pizza$ = rxjs.from(pizzas);
                        pizza$
                            .pipe(map(function (value) {
                            //console.log(value,respuestas.old);
                            if (value == respuestas.old) {
                                pizzas[pizzas.indexOf(value)] = respuestas.nuevo;
                                return pizzas;
                            }
                        }))
                            .subscribe(function (ok) { }, function (error) { console.log("error:", error); }, function () {
                            // volver a actualizar la base
                            refreshDb();
                        });
                    });
                    break;
                case 'Eliminar Pizzas':
                    inquirer
                        .prompt(pregunta_eliminar)
                        .then(function (respuestas) {
                        //buscar y borrar
                        var contenido = '';
                        var pizza$ = rxjs.from(pizzas);
                        pizza$
                            .pipe(map(function (value) {
                            if (value == respuestas.borrar) {
                                pizzas.splice(pizzas.indexOf(value), 1);
                                return pizzas;
                            }
                        }))
                            .subscribe(function (ok) { }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            refreshDb();
                        });
                    });
                    break;
                case 'Ingresar Pizza':
                    inquirer
                        .prompt(pregunta_insertar)
                        .then(function (respuestas) {
                        pizzas.push(respuestas.insert);
                        var pizza$ = rxjs.from(pizzas);
                        pizza$
                            .subscribe(function (ok) { }, function (error) { console.log("error:", error); }, function () {
                            // volver a actualizar la base
                            refreshDb();
                        });
                    });
                    break;
                case 'Consultar Pedidos':
                    GetData('DataBase/facturas')
                        .then(function (contenido) {
                        String(contenido).split(",").forEach(function (value) {
                            console.log(value);
                        });
                    });
                    menu_crud();
                    break;
            }
        }
    });
}
function refreshDb() {
    var contenido = '';
    contenido = String(pizzas);
    AppendFile('DataBase/pizzas', contenido, true)
        .then(function () {
        console.log('contenido actualizado');
        menu_crud();
    });
}
function pedir_pizza(pedido) {
    inquirer
        .prompt(preguntas_menu_secundario)
        .then(function (respuestas) {
        var size = respuestas.size.split(" $")[0];
        var precio = parseFloat(respuestas.size.split("$")[1]);
        var pizza = new Pizza(respuestas.clase, size, precio);
        var cantidad = respuestas.cantidad;
        pedido.ordenes.push(new Orden(pizza, cantidad));
        if (respuestas.seguir) {
            pedir_pizza(pedido);
        }
        else {
            var factura = '+-------------------------------------------------+\n' +
                'Detalle del pedido\n' +
                ("Fecha: " + pedido.fecha.toISOString() + "\n") +
                '+-------------------------------------------------+\n' +
                'Pizza       Tamaño      Cantidad    Precio Unitario\n' +
                '+-------------------------------------------------+\n' +
                pedido.mostrar_ordenes() +
                "+-------------------------------------------------+\n" +
                ("Total: " + pedido.calcular_total() + "\n") +
                '###################################################\n';
            console.log(factura);
            AppendFile('DataBase/facturas', factura, false)
                .then(function () {
                console.log('contenido actualizado');
                menu_crud();
            });
        }
    });
}
iniciar();
