// 06-callbacks.js

const fs = require('fs'); // Modulo file system
/*
fs.readFile(
  '04_operadores.js', // Nombre Archivo
  'utf-8',  // Codificacion
    (error, textoLeidoDelArchivo)=> {
        if (error) {
            throw new Error(error);
        } else {
            console.log(textoLeidoDelArchivo);
        }
    }
);
*/

console.log('Inicio');
fs.readFile(
  '06-texto.txt',
    'utf-8',  // Codificacion
    (error, textoLeidoDelArchivo)=> {
        if (error) {
            try {
                throw new Error(error);
            }catch (e) {
                console.log(e);
            }

        } else {

            fs.writeFile(
                '06-texto.txt',
                textoLeidoDelArchivo+'Mundo',
                (err)=>{
                        if (err) console.log('Error');
                        console.log('Archivo actualizado');
                }
            );
            console.log(textoLeidoDelArchivo);
        }
    }
);

console.log('Fin');