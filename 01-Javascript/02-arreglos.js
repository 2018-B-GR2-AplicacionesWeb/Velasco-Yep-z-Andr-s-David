var arreglo = [
    1,
    2.2,
    "Hola",
    true,
    false,
    {},
    undefined,
    null,
    []
];

var arregloNumeros = [1, 2, 3];
console.log(arregloNumeros[0], arregloNumeros[1], arregloNumeros[2]);
arregloNumeros.push(4) // Se agrega elementos al final de un arreglo


arregloNumeros.splice(0,1); // desde el elemento 0 hasta el elemento 1
console.log(arregloNumeros);
arregloNumeros.splice(0,0,0); // desde el elemento 0 hasta el elmento 0 agrega el 0
console.log(arregloNumeros);
arregloNumeros.splice(2,0,1.5);
console.log(arregloNumeros);
var usuario = 1.5;
var indiceUsuario = arregloNumeros.indexOf(usuario);
arregloNumeros.splice(indiceUsuario,1);
console.log(arregloNumeros)


var arregloNotasPrimerBimestre = [8.5, 9, 4];
var arregloNotasSegundoBimestre = [8.5, 9, 4];
//Destructuracion de arreglos
var arregloNotas2018B = [...arregloNotasPrimerBimestre, ...arregloNotasSegundoBimestre];
console.log(arregloNotas2018B)

//Destructuracion de objetos
var adrian2018A = {
  sexualidad: 0,
  web: 2
};

var adrian2018B = {
    musica: 7,
    moviles: 8
};

var adrian = {
    ...adrian2018A,
    ...adrian2018B
};

console.log(adrian);
