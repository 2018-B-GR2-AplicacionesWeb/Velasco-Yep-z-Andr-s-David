// usuario.module.ts

import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {UsuarioEntity} from "./usuario-entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forFeature([UsuarioEntity])
    ],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService
    ],
    exports:[
        UsuarioService
    ]
})
export class UsuarioModule {
}
