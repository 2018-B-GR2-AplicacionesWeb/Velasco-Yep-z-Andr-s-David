// libro.entity.ts

import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario-entity";
import {PaginaEntity} from "../pagina/pagina.entity";

@Entity('libro')
export class LibroEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 50
    })
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity, // Tipo relacion de muchos
        // a uno
        usuario => usuario.libros, // Campo donde nos guarda
    )
    usuario: UsuarioEntity;
    // libro.entity.ts
    @OneToMany(
        type => PaginaEntity,
        pagina => pagina.libro
    )
    paginas: PaginaEntity[];
}
