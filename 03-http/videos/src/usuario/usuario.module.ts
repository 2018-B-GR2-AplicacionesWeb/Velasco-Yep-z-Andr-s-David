// usuario.module.ts

import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario-entity";

@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ]
            )
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule {
}
