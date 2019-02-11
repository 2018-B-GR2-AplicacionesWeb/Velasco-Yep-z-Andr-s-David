// const NestFactory = require('@nestjs/core').NestFactory; //js
import {NestFactory} from '@nestjs/core'; // ts
// import * as httpserver from 'http-server'; // js
import {Options} from 'http-server'; // js
import {AppModule} from './app.module';
//import {} from './mi-codigo';
//const a = require('./mi-codigo').a;
// const session = require('express-session')
import * as express from 'express';
import * as session from 'express-session';

const FileStore = require('session-file-store')(session);


async function bootstrap() {
    //console.log(a)
    const app = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');
    //const FileStore = require('session-file-store')(session);
    app.use(
        session({
            name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore()
        })
    );

    // Configurar el servidor WEB

    app.use(express.static('publico'));

    // /bootstrap/css/bootstrap.css
    // /bootstrap/js/bootstrap.js

    await app.listen(3000);

}

bootstrap();

// of([1,2,3,4,5])
// ->map(
//     ([1,2,3,4,5])=>{
//         [1,2,3,4,5].findIndex(3)
//             [1,2,3,4,5][3].asdasdasdasd
//         return [1,2,3,4,5]
//     }
// )

