
// const NestFactory = require('@nestjs/core').NestFactory; //js
import {NestFactory} from '@nestjs/core'; // ts
// import * as httpserver from 'http-server'; // js
import {Options} from 'http-server'; // js
import {AppModule} from './app.module';
//import {} from './mi-codigo';
//const a = require('./mi-codigo').a;

async function bootstrap() {
    //console.log(a)
    const app = await NestFactory.create(AppModule);

    app.set('view engine', 'ejs');

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

