// npm install rxjs
// 02-observables


// No se puede const rxjs = require();

declare var require:any;
const rxjs = require('rxjs');

const numeros$ =rxjs.of(1,2,3,4,5,6) // Con el $ al final del nombre

numeros$
    .subscribe(
        (ok)=>{  // Cuando esta bien
            console.log('En ok',ok);
        },
        (error)=>{ // Cuando esta mal
            console.log('Error:',error)
        },
        ()=>{  //Cuando se completa

        },


    );


