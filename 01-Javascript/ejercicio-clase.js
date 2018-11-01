// EJERCICIO EN CLASE

const fs = require('fs');

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


promesaAppendFile('09-texto.txt','\nAdios mundos !!!!')
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
