// Deber
const fs = require('fs');

const promesaDeber = (arregloStrings) =>{
    const arregloRespuestas = [];
    return new Promise(
        (resolve,reject)=>{
            arregloStrings.forEach(
                (string,indice)=>{
                    const nombreArchivo=`${indice}-${string}.txt`;
                    const contenido = string;
                    fs.writeFile(
                        nombreArchivo,
                        contenido,
                        (error)=>{
                            const respuesta={
                                nombre_archivo:nombreArchivo,
                                contenido_archivo:contenido,
                                error,
                            };
                            arregloRespuestas.push(respuesta);
                            const termino_arreglo = arregloRespuestas.length === arregloStrings.length;
                            if (termino_arreglo){
                                resolve(arregloRespuestas)
                            }

                        }
                    );
                }
            )
        }

    );

};

promesaDeber(['X','Y','Z'])
    .then(
        (arregloRespuestas)=>{
                console.log(arregloRespuestas)
        }
    );
