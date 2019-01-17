import {
    Get,
    Controller,
    Request,
    Response,
    Headers,
    HttpCode,
    HttpException,
    Query,
    Param,
    Res,
    Post, Body, Session, BadRequestException
} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";
import {Usuario, UsuarioService} from "./usuario/usuario.service";


// http://192.168.1.2:3000/Usuario/saludar     METODO -> GET
// http://192.168.1.2:3000/Usuario/salir   METODO -> POST
// http://192.168.1.2:3000/Usuario/registrar METODO -> PUT
// http://192.168.1.2:3000/Usuario/borrar METODO -> DELETE
// http://192.168.1.2:3000/Notas


// Decorador -> FUNCION
// SE EJECUTA ANTES DE ALGO
@Controller() // Decoradores!
export class AppController {

    // CONSTRUCTOR NO ES UN CONSTRUCTOR NORMAL!!!

    constructor(
        private readonly _usuarioService: UsuarioService,
        // private readonly _appService:AppService,
    ) {

    }


    @Get('sesion')
    saludar(
        @Query() queryParams,
        @Query('nombre') nombre,
        @Headers('seguridad') seguridad,
        @Session() sesion
    ): string { // metodo!
        console.log(sesion);
        return nombre;
    }

    // /Usuario/segmentoUno/12/segmentoDos
    @Get('segmentoUno/:idUsuario/segmentoDos')
    ruta(
        @Param() todosParametrosRuta,
        @Param('idUsuario') idUsuario,
    ): string { // metodo!
        return idUsuario;
    }


    @Get('despedirse')
    @HttpCode(201)
    despedirse(): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {

                throw new HttpException({
                        mensaje: 'Error en despedirse',
                    },
                    400);
            }
        );
    }

    @Get('tomar')
    @HttpCode(201)
    tomar(): string { // metodo!
        return 'Estoy borracho';
    }

    @Get('saludarObservable')
    saludarObservable(): Observable<string> { // metodo!
        return of('Hola mundo');
    }

    @Get('login')
    @HttpCode(200)
    loginVista(
        @Res() response
    ){
        response.render('login');
    }

    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('username') username:string,
        @Body('password') password:string,
        @Res() response,
        @Session() sesion,
    ){
        const identificado = await this._usuarioService.login(username, password);
        if(identificado){
            sesion.usuario = username;
            response.redirect('/sesion')
        }else {
            throw new BadRequestException({mensaje:'Error en el login'})
        }
    }

    @Get('logout')
    logout(
        @Res() response,
        @Session() sesion,
    ){
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/login');
    }
}
