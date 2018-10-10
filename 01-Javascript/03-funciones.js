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