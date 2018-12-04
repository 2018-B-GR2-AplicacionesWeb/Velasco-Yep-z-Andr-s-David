const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
declare var require:any;
declare var Promise:any;

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID Usuario',
    }
];

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es tu id'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es tu nombre'
    },
];

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre'
    },
];


function inicialiarBDD() {

    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {

                        fs.writeFile(
                            'bdd.json',
                            '{"usuarios":[],"mascotas":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[],"mascotas":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}

async function main() {

    // 1) Inicializar bdd -- DONE
    // 2) Preguntas Menu -- DONE
    // 3) Opciones de Respuesta --  DONE
    // 4) ACCCION!!!!  -- DONE
    // 5) Guardar BDD --


    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());

    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )


    /*
    try {
        const respuestaInicializarBDD:RespuestaBDD = <RespuestaBDD> await inicialiarBDD();
        const bdd = respuestaInicializarBDD.bdd;
        const respuestaMenu = await inquirer.prompt(preguntaMenu);
        switch (respuestaMenu.opcionMenu) {
            case 'Crear':
                // Preguntar datos del nuevo Usuario
                const usuario = await inquirer.prompt(preguntaUsuario);
                // CREAR USUARIO
                bdd.usuarios.push(usuario); // JS
                const respuestaGuardado = await guardarBDD(bdd);
                main();
                break;
        }
    } catch (e) {
        console.error(e)
    }
    */
}

function guardarBDD(bdd: BDD) {
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
                        })
                    }

                }
            )
        }
    )
}


main();


function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                            // Cualquier cosa JS
                        }
                    )
                );

            // OBSERVABLE!!!!!!!!!!
        }
    )
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (usuario: Usuario) => { // resp ant OBS
                                    respuestaBDD.usuario = usuario;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    break;
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                case 'Borrar':
                    break;
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

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const usuario = respuestaBDD.usuario;
                    respuestaBDD.bdd.usuarios.push(usuario);
                    return respuestaBDD;
                case 'Actualizar':
                    const indice = respuestaBDD.indiceUsuario;
                    respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                    return respuestaBDD;

            }
        }
    )
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    usuario?: Usuario;
    indiceUsuario?: number;
}

interface BDD {
    usuarios: Usuario[] | any;
    mascotas: Mascota[];
}


interface Usuario {
    id: number;
    nombre: string;
}

interface Mascota {
    id: number;
    nombre: string;
    idUsuario: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (usuario: any) => {
                                return usuario.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceUsuario = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionUsuario))
                            .pipe(
                                map(
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.usuario ={
                                            id:null,
                                            nombre:nombre.nombre
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}