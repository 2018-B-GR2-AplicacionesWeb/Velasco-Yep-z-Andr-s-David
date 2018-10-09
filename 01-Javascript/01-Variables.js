//Tipos de variables

var nombreVariable = 'valorVariable';
var edad = 1; //number
var edad2 = '1'; //string
var casado = false;
var amigable = null;
var existeONo = undefined; //undefined Tipo undefined
var fecha_nacimiento = new Date('1996-08-04');
console.log(typeof edad);
console.log(typeof edad2);
console.log(typeof casado);
console.log(typeof amigable);
console.log(typeof existeONo);
console.log('fecha de nacimiento: ', typeof  fecha_nacimiento, fecha_nacimiento);


//NO TIPADO -: no tiene tipos

//TIPADO - : tipos


//Javascroipt
//Notacion de un objeto
var adrian = {
    "nombre": 'Adrian',
    edad: 29,
    hijos: undefined,
    llave:'valor',
};

console.log(adrian.nombre); // 'Adrian'
console.log(adrian.edad); // '29'
console.log(adrian.hijos);
console.log(adrian.llave);

var adrianJSON = {
  "llave":'valor'
};

console.log(10+10);

if ('adrian'){
    //Si
}else{
    //No
}

