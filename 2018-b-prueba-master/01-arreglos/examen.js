const fs = require('fs');
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;
function inicializarBDD(nombreArchivo) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile(nombreArchivo, '{[]}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{[]}')
                        });
                    }
                });
            }
            else {
                resolve(JSON.parse(contenidoArchivo));
            }
        });
    });
}
const respuesta$ = rxjs.from(inicializarBDD('./people.json'));
// Las preguntas 1 a la 4 equivalen tambien a la 5
respuesta$
    .pipe(map(// respuesta ant obs
(respuesta) => {
    var r = respuesta.map((d) => { return d['gender']; })
        .filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
    return r;
}))
    .subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => { console.log('Complete'); });
// Pregunta dos
respuesta$
    .pipe(map(// respuesta ant obs
(respuesta) => {
    var r = respuesta.map((d) => { return d['eye_color']; }).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
    return r;
}))
    .subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => { console.log('Complete'); });
// Pregunta tres
respuesta$
    .pipe(map(// respuesta ant obs
(respuesta) => {
    var r = respuesta.map((d) => { return d['skin_color']; })
        .filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
    ;
    return r;
}))
    .subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => { console.log('Complete'); });
// Pregunta cuatro
respuesta$
    .pipe(map(// respuesta ant obs
(respuesta) => {
    var r = respuesta.map((d) => { return d['hair_color']; })
        .filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
    return r;
}))
    .subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => { console.log('Complete'); });
// La pregunta 5 ya esta hecha implicitamente con las preguntas 1-4
// Pregunta Seis
respuesta$
    .pipe(map(// respuesta ant obs
(respuesta) => {
    var resultado = [];
    var r = respuesta.map((d) => { return d['name']; });
    let alfabeto = 'abcdefghijklmnñopqrstuvwxyz'.split('');
    alfabeto.forEach((letra) => {
        if (r.toString().indexOf(letra) > -1) {
            resultado.push(letra + ':' + true);
        }
        else {
            resultado.push(letra + ':' + false);
        }
    });
    return resultado;
}))
    .subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => { console.log('Complete'); });
// Pregunta siete
respuesta$
    .pipe(map(// respuesta ant obs
(respuesta) => {
    var resultado = [];
    var mass = respuesta.map((d) => { return d['mass']; });
    var height = respuesta.map((d) => { return d['height']; });
    resultado.push("mass" + ':' + mass.reduce((valor, valor2) => {
        return parseInt(valor) + parseInt(valor2);
    }, 0));
    resultado.push("heigth" + ':' + height.reduce((valor, valor2) => {
        return parseInt(valor) + parseInt(valor2);
    }, 0));
    return resultado;
}))
    .subscribe((data) => { console.log(data); }, (error) => { console.log(error); }, () => { console.log('Complete'); });
