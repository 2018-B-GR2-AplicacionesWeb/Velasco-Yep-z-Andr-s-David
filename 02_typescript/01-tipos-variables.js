// 01-tipos-variables.ts
// DUCK TYPING -> DUCK
let nombre = 'Andres';
nombre = '1';
let edad = 21.2;
edad = 12;
edad = '21';
const casado = false;
//const adrian = {};
const arreglosNumeros = [1, 2, 3];
arreglosNumeros.push('2');
//arreglosNumeros[1].getTime();
//const fecha = new Date();
const adrian = {
    nombre: 'andres',
};
adrian.apellido = 'EGUEZ';
// ERROR => adrian.estado = 'Inactive'
let fecha = new Date();
function saludar(nombre, apellido, ...otrosNombres) {
    return '';
}
saludar('andres', 'velasco');
saludar('andres');
let respuestaSaludar = saludar('a', 'v', 1, 2, 3); // Casteo
// Error => respuestaSaludar = ''
const saludarDos = (nombre) => {
    return '';
};
class Usuario {
}
const usuario = {
    nombre: 'Andres',
};
// tsc nombre-archivo.ts
