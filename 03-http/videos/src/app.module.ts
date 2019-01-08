import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario-entity";
import {LibroEntity} from "./libro/libro.entity";
import {PaginaEntity} from "./pagina/pagina.entity";
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'andres',
            password: '1234',
            database: 'webdb',
            synchronize: true,
            dropSchema:false,
            entities:[
                UsuarioEntity,
                LibroEntity,
                PaginaEntity
            ]
        }),
        UsuarioModule
    ], // Modulos
    controllers: [AppController], // Controllers
    providers: [
        AppService
    ], // Servicios
})
export class AppModule {
}
