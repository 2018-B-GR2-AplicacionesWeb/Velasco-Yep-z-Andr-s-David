// const NestFactory = require('@nestjs/core').NestFactory; //js
import {NestFactory} from '@nestjs/core'; // ts
// import * as httpserver from 'http-server'; // js
import {Options} from 'http-server'; // js
import {AppModule} from './app.module';
//import {} from './mi-codigo';
//const a = require('./mi-codigo').a;
// const session = require('express-session')
import * as express from  'express';
import * as session from 'express-session';
const FileStore = require('session-file-store')(session);


async function bootstrap() {
    //console.log(a)
    const app = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');
    //const FileStore = require('session-file-store')(session);
    app.use(
        session({
            name:'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore()
        })
    );
    // configurar el servidor web
    app.use(express.static('publico'));
    await app.listen(3000);
}

bootstrap();