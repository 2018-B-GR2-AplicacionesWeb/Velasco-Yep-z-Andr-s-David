// 01-tipos-variables.ts

// DUCK TYPING -> DUCK
let nombre:any = 'Andres';
nombre='1'
let edad:number | string = 21.2;
edad = 12;
edad = '21';
const casado = false;
//const adrian = {};
const arreglosNumeros: Date[]|number[] |string[] | any = [1,2,3];
arreglosNumeros.push('2');
//arreglosNumeros[1].getTime();
//const fecha = new Date();

const adrian: { // Interface
    nombre:string    // Requerido
    apellido?:string // Opcional
    estado?:'Activo' | 'Inactivo'; // Para quemar los valores
    saludar?:(nombre:string)=>string
}={ // JSON
    nombre:'andres',
    //apellido:'velasco'
};

adrian.apellido = 'EGUEZ'
// ERROR => adrian.estado = 'Inactive'

let fecha:Date = new Date();

function saludar(
    nombre:string,
    apellido?:string,
    ...otrosNombres:number[]
):string | number {
    return ''
}


saludar('andres','velasco');
saludar('andres');
let respuestaSaludar = <number> saludar('a','v',1,2,3); // Casteo
// Error => respuestaSaludar = ''

const saludarDos = (nombre:string):string=>{
  return ''
};

class Usuario{
    nombre:string //Por defecto es public
}

interface UsuarioInterface {
    nombre:string;
}

const usuario:UsuarioInterface= {
    nombre : 'Andres',
};
// tsc nombre-archivo.ts --target es2017