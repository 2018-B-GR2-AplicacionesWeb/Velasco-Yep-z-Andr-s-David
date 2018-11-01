// 08-promesas.js
/*
const promesa = new Promise(
    (resolve,reject) => {
        //resolve() // HASTA QUE NO SE EJECTUTE EL RESOLVE NO SE EJECUTA EL then
        console.log('Ejecutando');
        reject()
    }
);
*/

const fs = require('fs');



const promesa = (nombreArchivo) => {
    return new Promise(
        (resolve,reject) => {
            //resolve() // HASTA QUE NO SE EJECTUTE EL RESOLVE NO SE EJECUTA EL then
            //console.log('Ejecutando');
            //reject(10)

            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoLeido)=>{
                    if (error){
                        reject(error);
                    }else {
                        resolve(contenidoLeido)
                    }
                }
            )
        }
    );
};


console.log(promesa);
promesa('07-texto.txt','contenido')
    .then(
        (contenido)=>{
            console.log('OK ',contenido)
            return promesaEscritura(
                '07-texto.txt',
                contenido + 'Nuevo Contenido'
            );
        }
    )

    .catch(
        (numero)=>{
            console.log('Mal ',numero)
        }
    );


const promesaEscritura = (
    nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};


promesaEscritura('07-texto.txt')
    .then(
        (contenido)=>{
            console.log('OK ',contenido)
        }
    )

    .catch(
        (error)=>{
            console.log('Mal ',error)
        }
    );

// EJERCICIO EN CLASE

const promesaAppendFile = (nombreArchivo, contenido)=>{
    return  new Promise(
        (resolve,reject) => {

            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                          nombreArchivo,
                          contenido,
                            (error)=>{
                              if (error){
                                  reject(error);
                              }else {
                                  resolve(contenido)
                              }
                            }
                        );

                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivo+contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );
                    }
                }
            );

        }
    );
};


promesaAppendFile('08-texto.txt','\nAdios mundos')
    .then(
        (contenido) =>{
            console.log('OK ',contenido);
        }

    )



    .catch(
        (error)=>{
            console.log("error: ",error)

        }
    );



