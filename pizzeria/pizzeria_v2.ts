const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
declare var require:any;

//const preguntaMenu_Inicio = require('./preguntas').preguntaMenu_Inicio;
const preguntaMenu_Inicio = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Login',
    choices: [
        'Modulo Pizzas',
        'Modulo Clientes',
    ]
}

const preguntaEdicion = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre?'
    },
];

const preguntaMenu_crud = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Buscar',
        'Crear',
        'Actualizar',
        'Borrar',
    ]
}
const pregunta_ingresar_pizza = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese ID Pizza',
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Nombre de pizza',
    }
];

const pregunta_ingresar_cliente = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese ID Cliente',
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Nombre del Cliente',
    }
];

const preguntaBuscar_pizza = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese ID Pizza',
    }
];

const preguntaBuscar_cliente = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese ID Cliente',
    }
];
interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu_pizzas?: OpcionMenu_pizzas;
    cliente?: Cliente;
    pizza?:Pizza;
    indiceCliente?: number;
    opcioMenu_inicio?:OpcionMenu_inicio;
    indicePizza?: number;
}

interface BDD {
    clientes: Cliente[] | any;
    pizzas: Pizza[] | any;
}


interface Cliente {
    id: number;
    nombre: string;
}

interface Pizza {
    id: number;
    nombre: string;
}

interface OpcionMenu_pizzas {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}


interface OpcionMenu_inicio {
    opcionMenu: 'Modulo Pizzas' | 'Modulo Clientes';
}

interface Buscar_Cliente_Por_Id {
    id: string;
}

interface Buscar_Pizza_Por_Id {
    id: string;
}

/*
*/

function incializarBDD() {
    // @ts-ignore
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error,contenidoArchivo)=>{
                    if(error){
                        fs.writeFile(
                            'bdd.json',
                            '{"clientes":[],"pizzas":[]}',
                            (error)=>{
                                if(error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                }else {
                                    resolve(
                                        {
                                            mensaje: 'BDD leida',
                                            bdd: JSON.parse('{"clientes":[],"pizzas":[]}')
                                        }
                                    )
                                }                           }
                        )
                    }else {
                        resolve(
                            {
                                mensaje: 'BDD leida',
                                bdd: JSON.parse(contenidoArchivo)
                            }
                        )
                    }
                }

            )
        }
    );
}


// @ts-ignore
async  function main(){
    //1) Inicializar bdd
    //2) Preguntas Login
        //2.1) Admin
        //2.2) Cliente
    //3) Opciones de Respuespuesta
    //4) ACCION
    //5)GUARDAR BDD
    const respuestaBDD$ = rxjs.from(incializarBDD());
    respuestaBDD$
        .pipe(
            preguntarOpcionMenu_Inicio(),
            opcionesRespuesta_inicio(),
        )
        .subscribe(
            ()=>{},
            (error)=>{console.log(error)},
            ()=>{main();console.log("Completado")}

        )

}

function preguntarOpcionMenu_Inicio() {
    //
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD:RespuestaBDD)=>{
            return rxjs
                .from(inquirer.prompt(preguntaMenu_Inicio))
                .pipe(
                    map(// respuesta ant obs
                        (respuesta:OpcionMenu_inicio)=>{
                            respuestaBDD.opcioMenu_inicio=respuesta;
                            return respuestaBDD
                        }
                    )
                )
        }

    )
}

function opcionesRespuesta_inicio() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcioMenu_inicio.opcionMenu;
            switch (opcion) {
                case 'Modulo Pizzas':
                    return rxjs
                        .from(incializarBDD())
                        .pipe(
                                preguntarOpciones_crud(),
                                opcionesRespuesta_crud(),
                                ejecutarAccion_crud(),
                                guardarBaseDeDatos(),
                                // Ejecutar Accion
                                //Guardar BDD
                        );

                case 'Modulo Clientes':
                    return rxjs
                        .from(incializarBDD())
                        .pipe(
                            preguntarOpciones_crud(),
                            opcionesRespuesta_crud('cliente'),
                            ejecutarAccion_crud('cliente'),
                            guardarBaseDeDatos(),
                        );

            }
        }
    )
}

function preguntarOpciones_crud(){
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD:RespuestaBDD)=>{
            return rxjs
                .from(inquirer.prompt(preguntaMenu_crud))
                .pipe(
                    map(// respuesta ant obs
                        (respuesta:OpcionMenu_pizzas)=>{
                            respuestaBDD.opcionMenu_pizzas=respuesta;
                            console.log(respuestaBDD.opcionMenu_pizzas);
                            return respuestaBDD
                        }
                    )
                )
        }

    )
}
function opcionesRespuesta_crud(entidad:String='pizza'){
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu_pizzas.opcionMenu;
            console.log(respuestaBDD.opcionMenu_pizzas.opcionMenu);
            switch (opcion) {
                case 'Crear':
                    if (entidad==='pizza') {
                        return rxjs
                            .from(inquirer.prompt(pregunta_ingresar_pizza))
                            .pipe(
                                map(
                                    (pizza: Pizza) => { // resp ant OBS
                                        respuestaBDD.pizza = pizza;
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }else {
                        return rxjs
                            .from(inquirer.prompt(pregunta_ingresar_cliente))
                            .pipe(
                                map(
                                    (cliente: Cliente) => { // resp ant OBS
                                        respuestaBDD.cliente = cliente;
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                case 'Buscar':
                    if(entidad==='pizza'){
                        return consultar_pizza_por_id(respuestaBDD)
                    }else {
                        return consultar_cliente_por_id(respuestaBDD)
                    }

                case 'Actualizar':
                    if(entidad==='pizza'){
                        return consultar_pizza_por_id(respuestaBDD,true);
                    }else {
                        return consultar_cliente_por_id(respuestaBDD,true)
                    }

                case 'Borrar':
                    if(entidad==='pizza') {
                        return consultar_pizza_por_id(respuestaBDD)
                    }else {
                        return consultar_cliente_por_id(respuestaBDD)
                    }
            }
        }
    )
}


function  actualizar_entidad(respuestaBDD:RespuestaBDD, entidad:String='pizza') {
    return rxjs
        .from(inquirer.prompt(preguntaEdicion))
        .pipe(
            mergeMap(
                (respuesta:{nombre:string})=>{
                    if(entidad==='pizza') {
                        respuestaBDD.pizza = {
                            id: null,
                            nombre: respuesta.nombre,
                        }
                    }else {
                        respuestaBDD.cliente={
                            id:null,
                            nombre:respuesta.nombre,
                        }
                    }
                    return rxjs
                        .from(incializarBDD())
                        .pipe(
                            map(
                                () => {
                                    return respuestaBDD
                                }
                            )
                        );
                }
            )
        )
}

function consultar_pizza_por_id(respuestaBDD:RespuestaBDD,actualizar=false) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscar_pizza))
        .pipe(
            mergeMap(
                (respuesta: Buscar_Pizza_Por_Id) => { // resp ant OBS
                    //const indice = pizza.id;
                    const indicePizza = respuestaBDD.bdd
                        .pizzas.findIndex(
                        (pizza:any)=>{
                            return pizza.id === respuesta.id
                        }
                    );
                    if(indicePizza === -1){
                        console.log('No existe ese id por favor ingrese otro: ');
                        return consultar_pizza_por_id(respuestaBDD);
                    }else {
                        respuestaBDD.indicePizza = indicePizza
                        //respuestaBDD.pizza = respuestaBDD.bdd.pizzas[indicePizza].nombre;
                        //return respuestaBDD;
                        if (actualizar) {
                            return  actualizar_entidad(respuestaBDD);
                        } else {
                            return rxjs
                                .from(incializarBDD())
                                .pipe(
                                    map(
                                        () => {
                                            return respuestaBDD
                                        }
                                    )
                                );
                        }
                    }

                }
            )
        )
}
function consultar_cliente_por_id(respuestaBDD:RespuestaBDD,actualizar=false) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscar_cliente))
        .pipe(
            mergeMap(
                (respuesta: Buscar_Cliente_Por_Id) => { // resp ant OBS
                    //const indice = pizza.id;
                    const indiceCliente = respuestaBDD.bdd
                        .clientes.findIndex(
                            (cliente:any)=>{
                                return cliente.id === respuesta.id
                            }
                        );
                    if(indiceCliente === -1){
                        console.log('No existe ese id por favor ingrese otro: ');
                        return consultar_pizza_por_id(respuestaBDD);
                    }else {
                        respuestaBDD.indiceCliente = indiceCliente
                        //respuestaBDD.pizza = respuestaBDD.bdd.pizzas[indiceCliente].nombre;
                        //return respuestaBDD;
                        if (actualizar) {
                            return actualizar_entidad(respuestaBDD,'cliente');
                        } else {
                            return rxjs
                                .from(incializarBDD())
                                .pipe(
                                    map(
                                        () => {
                                            return respuestaBDD
                                        }
                                    )
                                );
                        }
                    }

                }
            )
        )
}

function ejecutarAccion_crud(entidad:String='pizza') {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu_pizzas.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    if (entidad==='pizza') {
                        const pizza = respuestaBDD.pizza;
                        respuestaBDD.bdd.pizzas.push(pizza);
                    }else {
                        const cliente = respuestaBDD.cliente;
                        respuestaBDD.bdd.clientes.push(cliente);
                    }
                    return respuestaBDD;
                case 'Actualizar':
                    if (entidad==='pizza') {
                        const indice = respuestaBDD.indicePizza;
                        respuestaBDD.bdd.pizzas[indice].nombre = respuestaBDD.pizza.nombre;
                    }else {
                        const indice = respuestaBDD.indiceCliente;
                        respuestaBDD.bdd.clientes[indice].nombre = respuestaBDD.cliente.nombre;
                    }
                    return respuestaBDD;
                case 'Buscar':
                    if (entidad==='pizza') {
                        console.log(`Pizza encontrada: ${respuestaBDD.bdd.pizzas[respuestaBDD.indicePizza].nombre}`);
                    }else {
                        console.log(`Cliente encontrado: ${respuestaBDD.bdd.clientes[respuestaBDD.indiceCliente].nombre}`);
                    }
                    return respuestaBDD
                case 'Borrar':
                    if (entidad==='pizza') {
                        console.log(`Pizza a borrar: ${respuestaBDD.bdd.pizzas[respuestaBDD.indicePizza].nombre}`);
                        const indice_borrar = respuestaBDD.indicePizza;
                        respuestaBDD.bdd.pizzas.splice(indice_borrar, 1);
                    }else {
                        console.log(`Cliente a borrar: ${respuestaBDD.bdd.clientes[respuestaBDD.indiceCliente].nombre}`);
                        const indice_borrar = respuestaBDD.indiceCliente;
                        respuestaBDD.bdd.clientes.splice(indice_borrar, 1);
                    }
                    return respuestaBDD
            }
        }
    )
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}
function guardarBDD(bdd: BDD) {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        }
                        )
                    }

                }
            )
        }
    )
}


main();