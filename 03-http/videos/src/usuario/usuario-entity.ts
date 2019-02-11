// usuario-entity.ts

import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity('db_usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombre_primero',
            type: 'varchar',
            length: 50,
            default: 'nombre'
        }
    )
    nombre: string;

    @Column({
        nullable: true,
    })
    biografia: string;

    @Column({
        nullable: true
    })
    username: string;

    @Column({
        nullable: true
    })
    password: string;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @OneToMany(
        type => LibroEntity, // Tipo de Dato Un Usuario a muchos
        // Libros[]
        libro => libro.usuario // Cual es el campo FK
    )
    libros: LibroEntity[];


}