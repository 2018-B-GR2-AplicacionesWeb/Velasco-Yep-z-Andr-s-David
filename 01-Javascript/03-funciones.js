function sumarDosNumeros(numUno,numDos) {
    //validaciones
    var numeroUnoEsNumber = typeof numUno == "number"; // true
    var numeroDosEsNumber = typeof  numDos == "number"; //true
    if (numeroUnoEsNumber && numeroDosEsNumber){
        return numUno+numDos;
    }else{
        return 0;
    }
}
// envio otros parametros
console.log(sumarDosNumeros('a',null));
// no envio parametros
console.log(sumarDosNumeros());
// envio parametros extra
console.log(sumarDosNumeros(1,2,3,4,5));
// envio parametros correctos
console.log(sumarDosNumeros(1,2));

function sumarNumeros(...parametros) {
    console.log(parametros);
    console.log(parametros.length);
    total=0;
    for (i=0;i<parametros.length;i++){
        total=total+parametros[i];
    }
    return total;
}
console.log(sumarNumeros(1,2,3,4));

//Templates strings
function saludar(nombre, funcionMensajeria) {
    var saludo = `Hola ${nombre.toUpperCase()}`;
    funcionMensajeria(saludo);
    return saludo;
}


saludar('andres',console.log);

function imprimirEnConsola(texto) {
    console.log(texto);
}

saludar('andres',imprimirEnConsola);

var variable = 'valor'; //Nunca mas
let edad = 29;  // Mutar objeto.....
edad = 30
const casado = false;  // Inmutable

const mascotas = {}
mascotas.cachetes = 'cachetes';
mascotas.numero = 1;

delete mascotas.numero;
const carros = []

// Anonymos Functions
// Asignar variables
const saludar = function () {


};

// Asignar metodos a un objeto
const usuario = {
    nombre: 'Andres',
    f:function () {
        //implementacion
    }
}

// ENviar como paramento
saludar('andres',function (texto) {
    console.log(texto)
})


// fat arrow functions -> =>

const saludarV3 = () => {

};


saludarV3();

const usuarioV2={
    nombre: 'Andres',
    metodo: ()=>{

    }
};

saludar("Adrian",(texto)=>{
    console.log(texto)
})

const sumarDosNumerosV2 = (n1,n2) => n1+n2;
const saludarV5 = (saludo) => console.log(saludo);
saludar('hola',(saludo) => console.log(saludo));

