
// For each
const arreglo = ['A','b','C'];
/*
const respuestaForEach = arreglo
    .forEach(
        (valor,indice,arreglo) => {
            console.log('valor',valor);
            console.log('indice',indice);
            console.log('arreglo',arreglo);
        }


    );
*/


const respuesetaForEach = arreglo.forEach((v) => console.log(v));

console.log(respuesetaForEach) // Undefined

// map
/*
const respuestaMap = arreglo
    .map((v) =>v.toUpperCase())
    .forEach((v)=>console.log(v));

console.log(arreglo)
console.log(respuestaMap)

*/


const arregloNumeros = [5,3,6,7,3,,9,1,8,2,10]
const respuesta = arregloNumeros
    .filter(
        (v)=>{
            return v%2 === 0;
        }
    )

console.log(respuesta)

const respuesta2 = arregloNumeros
    .reduce(
        (v)=>{
            return v===7;
        }
    );

console.log(respuesta2)


const respuestaFinIndex=arregloNumeros.findIndex(
    (valorActual)=>{
        return valorActual === 7 //Expresion
    }

);

console.log(respuestaFinIndex)


// El index of, sirve cuando tienen el objeto completo


const respuestaFind = arregloNumeros.find(
    (valorActual)=>{
        return valorActual === 7 //Expresion
    }
)

console.log(respuestaFind)



const respuestaRede = arregloNumeros.reduce(
    (valorActual)=>{
        return valorActual > 8 //Expresion
    }
)

console.log(respuestaRede);


const respuestaSome = arregloNumeros
    .some(
        (valorActual)=>{
            return valorActual>10;
        }
    )

console.log(respuestaSome)




const respuestaEvery = arregloNumeros
    .every(
        (valorActual)=>{
            return valorActual>0;
        }
    )

console.log(respuestaEvery)

// reduce

// sumar todos los elementos del arreglo

const sumaTotal = arregloNumeros
    .reduce(
        (valorAcumulado,valorActual)=>{
            return valorActual+valorAcumulado;
        },
        0 // Valor con el que empieza la operacion
    )

console.log(sumaTotal)



// Version min

const sumaTotalv2 = arregloNumeros
    .reduce((a,b)=>a+b,0);

console.log(sumaTotalv2)

// sort
// Clonar el arreglo
const arregloNumerosClonado1= JSON.parse(JSON.stringify(arregloNumeros));
console.log(arregloNumerosClonado1)

const respuestaSort = arregloNumerosClonado1
    .sort(
        (a,b)=> a-b // Depende como se lo quiere arreglar - o +
    );
console.log(respuestaSort)