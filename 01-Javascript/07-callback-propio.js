// 07-callback-propio.js


const fs = require('fs');



function appendFile(nombreArchivo,contenidoArchivo,callback) {
    // 1-> Leer archivo
    // 2-> Concatenamos contenido
    // 3-> Crear el archivo
    fs.readFile(
        nombreArchivo,
        'utf8',
        (error,contenidoLeido)=>{
            if(error){
                const contenido = contenidoArchivo;
                // escribir el archivo
                fs.writeFile(
                  nombreArchivo,
                  contenido,
                    (err)=>{
                      if (err) {
                          //console.log('Error', err);
                          callback(err)
                          //return err;
                      }else {
                          console.log(contenidoArchivo);
                          //return contenidoArchivo;
                          callback(undefined, contenido);

                          // Si esta en otro orden
                          //callback(contenido) // se puede omitir el undefined
                      }
                    }
                );
            }else{
                //
                const contenido = contenidoLeido+contenidoArchivo;
                callback(undefined,contenido)

            }
        }
    );

}


appendFile('07-texto.txt',
            '\nHola',
            (error,contenidoTexto)=>{
                if (error){
                    console.log(error);
                }else {
                    console.log(contenidoTexto);
                }

            });


// Acepten un parametro de un arreglo  ['A','B','C']

// 0-A.txt --> Indice-valor[indice].txt --> contenido: valor[indice]

// respuesta = nombre del archivo

const respuesta = {
    nombreArchivo:'',
    contenidoArchivo:'',
    error: undefined
};

/// Arreglo de respuestas

function ejercios(arregloStrings,callback) {
    const arregloRespuestas = [];
    arregloStrings
        .forEach(
            (string,indice)=>{
                const nombreArchivo=`${indice}-${string}.txt`;
                const contenidoArchivo = string;

                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivo,
                    (error)=>{
                        const respuesta = {
                            nombreArchivo:nombreArchivo,
                            contenidoArchivo:contenidoArchivo,
                            error: undefined
                        };
                        arregloRespuestas.push(respuesta);
                        const terminoElArreglo = arregloStrings.length === arregloRespuestas.length
                        if (terminoElArreglo){
                            callback(arregloRespuestas);
                        }

                    }
                )
            })
}

ejercios(['A','B','C'],
            (arregloRespuestas)=>{
                console.log(arregloRespuestas);
            }
);