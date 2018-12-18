import {Injectable} from "@nestjs/common";

@Injectable()
export class UsuarioService{
    usuarios:Usuario[]= [
        {
            nombre:'Andres',
            biografia:'Doctor',
            apellido:'Velasco',
            id:2
        },
        {
            nombre:'Adrian',
            biografia:'Maestro',
            apellido:'Eguez',
            id:3
        },
        {
            nombre:'Susana',
            biografia:'Abogada',
            apellido:'Vasco',
            id:5
        }
    ];
    registroActual = 4;
    crear(nuevoUsuario: Usuario):Usuario{
        nuevoUsuario.id = this.registroActual++;
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario
    }

    actualizar(idUsuario:number,nuevoUsuario:Usuario):Usuario{
        const indiceUsuario = this.usuarios
            .findIndex(
                (usuario)=>usuario.id === Number(idUsuario)

            );
        this.usuarios[indiceUsuario] = nuevoUsuario
        return nuevoUsuario
    }

    borrar(idUsuario:number):Usuario{
        const indiceUsuario = this.usuarios
            .findIndex(
                (usuario)=>usuario.id === Number(idUsuario)
            );
        const usuarioBorrado = JSON.parse(JSON.stringify(this.usuarios[indiceUsuario]));
        this.usuarios.splice(indiceUsuario,1);
        return usuarioBorrado;
    }

    buscarPorId(idUsuario:number):Usuario{
        return this.usuarios.find(u=>u.id===idUsuario)
    }

    buscarPorNombreBiografia(busqueda:string){
        return this.usuarios.filter(
            (usuario)=>{
                // Si la contiene algo del nombre
                const tieneAlgoEnNombre = usuario.nombre.includes(busqueda);
                // Si la busqueda contiene algo de la biografia
                const tieneAlgoEnBiografia = usuario.biografia.includes(busqueda);
                return tieneAlgoEnNombre || tieneAlgoEnBiografia
            })
    }
}

export interface Usuario {
    nombre:String,
    biografia:String,
    apellido:String,
    id:number,

}