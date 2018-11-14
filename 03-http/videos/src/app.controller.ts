import {Get, Controller, Request, HttpCode, HttpException, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";
//http//192.165.2.6/usuario/saludar -> Metodo --> GET


@Controller('usuario') // Decoradores!
//Funcion que se ejecuta antes de algo
export class AppController {
  //constructor(private readonly appService: AppService) {}

  @Get('saludar')
  saludar(
      @Query('nombre') nombre
  ): string { // Metodo
    //return this.appService.root();
      return nombre
  }

  @Get('despedirse')
  @HttpCode(201)
  despedirse(): Promise<string> { // Metodo
     return new Promise<string>(
         (resolve,reject)=>{
              //resolve('adios');
             //reject('Adios!!');
             throw new HttpException({mensaje:"Error en despedirse",},400);
         }
     )
  }

    @Get('tomar')
    tomar(): Promise<string> { // Metodo
        return new Promise<string>(
            (resolve,reject)=>{
                resolve('Estoy borracho');
                //reject('Adios!!');
            }
        )
    }
    @Get('saludarObservable')
    saludarObservable(): Observable<string> { // Metodo
        return of('Hola mundo');
    }

    // Parametro de ruta
    @Get('segmentoUno/:id/segmentoDos')
    ruta(
        @Query() todosLosparametros,
        @Query('id') idUsuario,
    ): string { // Metodo
        //return this.appService.root();
        return idUsuario
    }
}

//fromArray([1,2,3,4,5])

