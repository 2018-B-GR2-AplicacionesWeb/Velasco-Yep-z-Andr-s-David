// usuario--entity.ts

import {Entity} from 'typeorm';
// @ts-ignore
import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {BeforeInsert} from 'typeorm';
import {OneToMany} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity('db_usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({
        name:'nombrePrimero',
        type:'varchar',
        length:30
    })
    nombre:string;
    @Column()
    biografia:string;

    @BeforeInsert()
    verificarFuncion(){
        console.log('Ejecuta despues de antes de insertat')
    }

    @OneToMany(
        libros => LibroEntity, // Tipo de Dato Un Usuario
        libro => libro.usuario, // CUAL ES EL CAMPO FK
    )
    libros:LibroEntity[]

}