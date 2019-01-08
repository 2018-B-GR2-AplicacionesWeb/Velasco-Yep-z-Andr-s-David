import {Inject, Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario-entity";
import {Repository} from "typeorm";
import {FindManyOptions} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
    usuarios: Usuario[] = [
        {
            nombre: 'Adrian',
            biografia: 'Doctor',
            id: 1
        },
        {
            nombre: 'Vicente',
            biografia: 'Maestro',
            id: 2
        },
        {
            nombre: 'Carolina',
            biografia: 'Diseñadora',
            id: 3
        }
    ];
    registroActual = 4;

    // Los constructores en el NEST SIRVEN PARA INJECTAR DEPENDENCIAS
    // @ts-ignore
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
    ){}

    async buscar(parametros?:FindManyOptions<UsuarioEntity>):Promise<UsuarioEntity[]>{
        return this._usuarioRepository.find(parametros);
    }

    borrar(idUsuario:number):Promise<UsuarioEntity>{
        const usuarioEntityAEliminar= this._usuarioRepository.create({
            id:idUsuario
        });
        return this._usuarioRepository.remove(usuarioEntityAEliminar);
    }

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);
        return usuarioCreado;
    }

    actualizar(idUsuario: number,
               nuevoUsuario: Usuario): Promise<UsuarioEntity> {
        nuevoUsuario.id = idUsuario;
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        return this._usuarioRepository.save(usuarioEntity)
    }


    buscarPorId(idUsuario: number) {
        return this._usuarioRepository.findOne(idUsuario)
    }

    buscarPorNombreOBiografia(busqueda:string): Usuario[]{
        return this.usuarios.filter(
            (usuario)=>{

                // Si la busqueda contiene algo del nombre
                const tieneAlgoEnElnombre = usuario
                    .nombre.includes(busqueda); // True / False

                // Si la busqueda contiene algo de la bio
                const tieneAlgoEnLaBio = usuario
                    .biografia.includes(busqueda);// True / False

                return tieneAlgoEnElnombre || tieneAlgoEnLaBio;
            }
        )
    }

}

export interface Usuario {
    id: number;
    nombre: string;
    biografia: string;
}