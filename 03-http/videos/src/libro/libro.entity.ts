// libro.entity.ts

import {Entity, ManyToOne, OneToMany} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm";
import {Column} from "typeorm";
import {type} from "os";
import {UsuarioEntity} from "../usuario/usuario-entity";
import {PaginaEntity} from "../pagina/pagina.entity";

@Entity('libro')
export class LibroEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        name:'nombre',
        type:'varchar',
        length:50,
    })
    nombre:string

    @ManyToOne(
        type=>UsuarioEntity,
        usuario => usuario.libros
    )
    usuario: UsuarioEntity;

@OneToMany(
    type => PaginaEntity,
    pagina => pagina.libro
)
paginas:PaginaEntity[]



}